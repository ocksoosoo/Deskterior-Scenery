import { getProducts, deriveBadgeFields } from "../api/productsApi";

export const CATEGORY_PAGE_SIZE = 6;

// 헤더 hover 프리페치 응답을 실제 이동 시 재사용하기 위한 캐시 (같은 조합이면
// 진행 중인 요청이나 최근 응답을 그대로 돌려줌)
const CACHE_TTL_MS = 15000;
// 이보다 오래 응답이 없으면 멈춘 요청으로 보고 다음 호출이 새로 요청하게 함
const MAX_PENDING_MS = 20000;
// 세션 내내 다양한 조합을 둘러봐도 Map이 무한정 안 쌓이게 하는 상한
const MAX_CACHE_ENTRIES = 50;
const cache = new Map();

// search에 구분자(|)가 들어있어도 안 꼬이게 배열을 JSON으로 직렬화해 키를 만듦
function buildKey({ categoryId, page, sort, search, pageSize }) {
  return JSON.stringify([categoryId, page, sort, search, pageSize]);
}

function isStuckPending(entry) {
  return entry.settledAt === null && Date.now() - entry.startedAt >= MAX_PENDING_MS;
}

// 요청 시작 시각이 아니라 "응답 시각" 기준으로 TTL을 재야, 아직 안 끝난 느린
// 요청이 중간에 지워져 중복 요청이 나가는 걸 막을 수 있다
function isFresh(entry, key) {
  if (!entry) return false;

  if (entry.settledAt === null) {
    return !isStuckPending(entry);
  }

  if (Date.now() - entry.settledAt >= CACHE_TTL_MS) {
    cache.delete(key);
    return false;
  }

  // 재사용될 때마다 맨 뒤로 옮겨서, 용량 초과 시 오래 안 쓰인 것부터 지워지게 함
  cache.delete(key);
  cache.set(key, entry);

  return true;
}

// 로그인 여부에 따라 같은 URL 응답이 달라질 수 있어(clientApi의 no-store와 같은
// 이유), 로그인/로그아웃 시 이전 캐시를 전부 비운다
export function clearCategoryProductsCache() {
  cache.clear();
}

export function fetchCategoryProducts({
  categoryId,
  page,
  sort,
  search,
  pageSize = CATEGORY_PAGE_SIZE,
}) {
  const key = buildKey({ categoryId, page, sort, search, pageSize });
  const cached = cache.get(key);

  if (isFresh(cached, key)) {
    return cached.promise;
  }

  // hover 프리페치 + 실제 마운트 등 여러 소비자가 같은 요청을 함께 기다릴 수
  // 있어, 이 요청은 취소하지 않고 항상 끝까지 진행한다
  const promise = getProducts({
    category: categoryId,
    page,
    limit: pageSize,
    sort,
    q: search,
  }).then((data) => ({
    ...data,
    products: data.products.map((product) => ({
      ...product,
      ...deriveBadgeFields(product),
    })),
  }));

  const entry = { promise, settledAt: null, startedAt: Date.now() };
  cache.set(key, entry);

  if (cache.size > MAX_CACHE_ENTRIES) {
    // 진행 중인 요청은 건너뛰고, 완료됐거나 멈춰버린 것 중 가장 오래된 것부터 지움
    for (const [oldKey, oldEntry] of cache) {
      if (oldEntry.settledAt !== null || isStuckPending(oldEntry)) {
        cache.delete(oldKey);
        break;
      }
    }
  }

  promise.then(
    () => {
      entry.settledAt = Date.now();
    },
    () => {
      // 참조를 비교해, 이 요청보다 늦게 실패한 요청이 그사이 새로 채워진
      // 최신 캐시 항목을 잘못 지우지 않게 함
      if (cache.get(key) === entry) cache.delete(key);
    },
  );

  return promise;
}

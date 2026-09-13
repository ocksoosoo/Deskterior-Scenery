import { clientApi } from "./clientApi";
import { getCategoryById } from "../data/categories";

// raw.stock/raw.badge → soldOut/isBest/isNew — 목록/상세 어디서든 이 함수 하나로만 판단한다
export function deriveBadgeFields(raw) {
  return {
    soldOut: (raw.stock ?? 0) <= 0,
    isBest: (raw.badge ?? []).includes("best"),
    isNew: (raw.badge ?? []).includes("new"),
  };
}

// 서버 응답 → 프론트 컴포넌트가 쓰는 모양으로 변환
function toProduct(raw) {
  const category = getCategoryById(raw.categoryId);

  return {
    id: raw.id,
    name: raw.name,
    price: raw.price,
    discountPrice: raw.discountPrice,
    description: raw.description,

    category: category?.name ?? raw.categoryId,
    categoryPath: category?.path ?? null,

    images: [raw.imageUrl, ...(raw.thumbnails ?? [])],

    // detailImages: 문자열 배열 → { imageUrl, title, description } 객체 배열
    detailSections: (raw.detailImages ?? []).map((item, index) => ({
      id: index + 1,
      image: item.imageUrl ?? item,
      title: item.title ?? "",
      body: item.description ?? "",
    })),
    ...deriveBadgeFields(raw),
    rating: raw.rating ?? 0,
    reviewCount: raw.reviewCount ?? 0,
  };
}

export function postProducts(data) {
  return clientApi("/products", {
    method: "POST",
    body: JSON.stringify(data),
  });
}

// 상품 목록 조회 — GET /products?category=&page=&limit=
export async function getProducts(params = {}) {
  const query = new URLSearchParams(params).toString();
  const res = await clientApi(`/products${query ? `?${query}` : ""}`); // { success, data: { products, pagination } }
  return res.data;
}

// 상품 상세 조회 — GET /products/{productId}
export async function getProduct(productId) {
  const res = await clientApi(`/products/${productId}`); // { success, data }
  return toProduct(res.data);
}

// 원본 상품 정보 반환 - getProductRaw()
export async function getProductRaw(productId) {
  const response = await clientApi(`/products/${productId}`);

  return response.data;
}
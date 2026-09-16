// 상품 이미지가 실제 표시 크기(보통 200~900px)보다 훨씬 큰 원본(1024px)으로
// 내려오고 있어서, wsrv.nl(무료 이미지 리사이징 프록시)을 거쳐 필요한 크기로
// 줄이고 압축해서 받는다. 원본 이미지 파일/주소 자체는 전혀 건드리지 않고,
// 화면에 그릴 때만 이 함수를 거쳐서 실제로 다운로드할 주소를 바꾼다.
//
// 로컬 에셋(Vite가 번들에 포함해 같은 오리진에서 서빙하는 이미지)은 이미
// 최적화돼 있고 굳이 외부 프록시를 거칠 필요가 없어서, 원격(http/https) 주소일
// 때만 프록시를 적용하고 그 외(로컬 경로, data URI 등)는 그대로 둔다
const IMAGE_PROXY_BASE = "https://wsrv.nl/";

export function toResizedImageUrl(url, width, quality = 80) {
  if (!url || typeof url !== "string" || !/^https?:\/\//.test(url)) {
    return url;
  }

  const params = new URLSearchParams({
    url: url.replace(/^https?:\/\//, ""),
    w: String(width),
    q: String(quality),
    output: "webp",
  });

  return `${IMAGE_PROXY_BASE}?${params.toString()}`;
}

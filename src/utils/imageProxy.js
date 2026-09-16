// 원본(1024px)보다 훨씬 작게 쓰이는 상품 이미지를 wsrv.nl 프록시로 필요한
// 크기만큼 리사이징/압축해서 받는다. 원격(http/https) 주소만 대상으로 하고,
// 이미 최적화된 로컬 에셋은 그대로 둔다
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

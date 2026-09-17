export const toResizedImageUrl = (url, width = 100) => {
  if (!url) return "";

  // 이미 wsrv.nl이 적용되어 있다면 그대로 반환
  if (url.includes("wsrv.nl")) return url;

  // ImgBB 원본 URL에서 https:// 부분만 살짝 떼어냄
  const cleanUrl = url.replace(/^https?:\/\//, "");

  // wsrv.nl 프록시 서버에 리사이징(+ WebP 압축) 요청 URL 생성
  return `https://wsrv.nl/?url=${encodeURIComponent(cleanUrl)}&w=${width}&q=80&output=webp`;
};

// PurchaseBox / MobileCtaBar 둘 다 쓰는 찜·결제 버튼 라벨 — 각자 따로
// 삼항연산자로 반복해서 계산하던 걸 한 곳으로 모음
export const getWishLabel = (isWished) => (isWished ? "찜 해제" : "찜하기");

export const getCheckoutText = (soldOut) => (soldOut ? "Sold Out" : "CheckOut");

export const getCheckoutTitle = (soldOut) => (soldOut ? "품절" : "결제하기");

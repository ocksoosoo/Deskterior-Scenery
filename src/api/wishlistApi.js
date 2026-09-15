import { clientApi } from "./clientApi";

export const wishlistApi = {
  // 전체 조회
  getWishlist: () => clientApi("/wishlist"),

  // 상품 추가 (찜하기)
  addWishlistItem: (productId) =>
    clientApi(`/wishlist/${productId}`, {
      method: "POST",
    }),

  // 개별 상품 삭제 (찜 취소)
  removeWishlistItem: (productId) =>
    clientApi(`/wishlist/${productId}`, {
      method: "DELETE",
    }),

  // 전체 삭제 (All Delete)
  clearWishlist: () =>
    clientApi("/wishlist", {
      method: "DELETE",
    }),
};

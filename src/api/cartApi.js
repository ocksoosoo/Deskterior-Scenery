import { clientApi } from "./clientApi";

export const cartApi = {
  // 전체 조회
  getCart: () => clientApi("/cart"),

  // 상품 담기
  addToCart: (productId, quantity) =>
    clientApi("/cart/items", {
      method: "POST",
      body: JSON.stringify({ productId, quantity }),
    }),

  // 수량 변경
  updateQuantity: (cartItemId, quantity) =>
    clientApi(`/cart/items/${cartItemId}`, {
      method: "PATCH",
      body: JSON.stringify({ quantity }),
    }),

  // 개별 상품 삭제
  removeItem: (cartItemId) =>
    clientApi(`/cart/items/${cartItemId}`, { method: "DELETE" }),

  // 선택 상품 삭제
  removeSelectedItems: (cartItemIds) =>
    clientApi("/cart/items", {
      method: "DELETE",
      body: JSON.stringify({ cartItemIds }),
    }),

  // 전체 삭제
  clearCart: () => clientApi("/cart", { method: "DELETE" }),

  // 상품 개수 조회(아이콘)
  getCartCount: () => clientApi("/cart/count"),
};

import { create } from "zustand";
import { persist } from "zustand/middleware";
import { cartApi } from "../api/cartApi";
import useAuthStore from "./UseAuthStore";

// 로그인 여부
const checkIsLoggedIn = () => !!useAuthStore.getState().user;

const useCartStore = create(
  persist(
    (set, get) => ({
      cartItems: [],
      isLoading: false,
      error: null,

      // 서버 장바구니 불러오기
      fetchCart: async () => {
        if (!checkIsLoggedIn()) return; // 비회원이면(로컬 스토리지 유지)

        set({ isLoading: true, error: null });
        try {
          const res = await cartApi.getCart();
          set({ cartItems: res.data, isLoading: false });
        } catch (err) {
          set({ error: err.message, isLoading: false });
        }
      },

      //  장바구니 담기
      addToCart: async (product, quantity = 1) => {
        if (checkIsLoggedIn()) {
          // 회원이면 API 호출 후 재조회
          try {
            await cartApi.addToCart(product.productId, quantity);
            await get().fetchCart();
          } catch (err) {
            set({ error: err.message });
            throw err;
          }
        } else {
          // 비회원은 로컬 배열만 업데이트
          set((state) => {
            const existing = state.cartItems.find(
              (i) => i.productId === product.productId,
            );
            if (existing) {
              return {
                cartItems: state.cartItems.map((i) =>
                  i.productId === product.productId
                    ? { ...i, quantity: i.quantity + quantity }
                    : i,
                ),
              };
            }
            // 새 상품 담기
            return {
              cartItems: [
                ...state.cartItems,
                {
                  ...product,
                  cartItemId: `local_${product.productId}`,
                  quantity,
                },
              ],
            };
          });
        }
      },

      // 수량 업데이트
      updateQuantity: async (cartItemId, quantity) => {
        if (quantity < 1) return;

        if (checkIsLoggedIn()) {
          try {
            await cartApi.updateQuantity(cartItemId, quantity);
            // 서버에 반영 성공 후 로컬 상태도 업데이트 (화면 리렌더링용)
            set((state) => ({
              cartItems: state.cartItems.map((item) =>
                item.cartItemId === cartItemId ? { ...item, quantity } : item,
              ),
            }));
          } catch (err) {
            set({ error: err.message });
            throw err;
          }
        } else {
          // 비회원 로컬 업데이트
          set((state) => ({
            cartItems: state.cartItems.map((item) =>
              item.cartItemId === cartItemId ? { ...item, quantity } : item,
            ),
          }));
        }
      },

      // 증가 / 감소
      increaseQuantity: (cartItemId) => {
        const item = get().cartItems.find((i) => i.cartItemId === cartItemId);
        if (!item) return;
        return get().updateQuantity(cartItemId, item.quantity + 1);
      },
      decreaseQuantity: (cartItemId) => {
        const item = get().cartItems.find((i) => i.cartItemId === cartItemId);
        if (!item || item.quantity <= 1) return;
        return get().updateQuantity(cartItemId, item.quantity - 1);
      },

      // 개별 삭제
      removeItem: async (cartItemId) => {
        if (checkIsLoggedIn()) {
          try {
            await cartApi.removeItem(cartItemId);
          } catch (err) {
            set({ error: err.message });
            throw err;
          }
        }

        // 로컬/서버 공통: 화면 배열에서 삭제
        set((state) => ({
          cartItems: state.cartItems.filter(
            (item) => item.cartItemId !== cartItemId,
          ),
        }));
      },

      // 선택 삭제
      removeSelectedItems: async (cartItemIds) => {
        if (checkIsLoggedIn()) {
          try {
            await cartApi.removeSelectedItems(cartItemIds);
          } catch (err) {
            set({ error: err.message });
            throw err;
          }
        }

        // 로컬/서버 공통: 체크된 ID가 아닌 상품들만 남기기
        set((state) => ({
          cartItems: state.cartItems.filter(
            (item) => !cartItemIds.includes(item.cartItemId),
          ),
        }));
      },

      // 전체 삭제
      clearCart: async () => {
        if (checkIsLoggedIn()) {
          try {
            await cartApi.clearCart();
          } catch (err) {
            set({ error: err.message });
            throw err;
          }
        }
        set({ cartItems: [] });
      },

      // 로그아웃 시 화면(로컬) 장바구니만 초기화
      clearLocalCart: () => {
        set({ cartItems: [] });
      },

      //  데이터 병합
      mergeLocalCartToServer: async () => {
        // 비회원일때 아이템 local로 시작
        const allLocalItems = get().cartItems;
        const guestItems = allLocalItems.filter((item) =>
          String(item.cartItemId).startsWith("local_"),
        );

        if (guestItems.length === 0) {
          // 비회원일때 담은아이템 없으면 서버에서 받아옴
          await get().fetchCart();
          return;
        }

        try {
          // 필터링된 아이템만 밀어넣음
          await Promise.all(
            guestItems.map((item) =>
              cartApi.addToCart(item.productId, item.quantity),
            ),
          );

          // 로컬 지우고 서버에 장바구니 데이터를 덮어쓰기
          await get().fetchCart();
          console.log("장바구니 병합 성공!");
        } catch (err) {
          console.error("장바구니 병합 실패:", err);
        }
      },
      // 7번 API
      syncCartWithServer: async () => {
        if (!checkIsLoggedIn()) return; // 비회원은 통신 안 함

        try {
          const res = await cartApi.getCartCount();

          const serverCount = res.data ? res.data.count : res.count;
          const localCount = get().cartItems.length;

          if (serverCount !== localCount) {
            console.log(
              `장바구니 동기화 중... (서버: ${serverCount}, 로컬: ${localCount})`,
            );
            await get().fetchCart();
          }
        } catch (err) {
          console.error("장바구니 뱃지 동기화 실패:", err);
        }
      },
    }),
    {
      name: "cart-storage",
      partialize: (state) => ({ cartItems: state.cartItems }),
    },
  ),
);

export default useCartStore;

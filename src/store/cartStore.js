import { create } from "zustand";
import { persist } from "zustand/middleware";
import { cartApi } from "../api/cartApi";
import useAuthStore from "./UseAuthStore";

// 로그인 여부
const checkIsLoggedIn = () => !!useAuthStore.getState().user;

// 장바구니 저장
const useCartStore = create(
  persist(
    (set, get) => ({
      cartItems: [],
      unselectedItemIds: [], // 체크 해제만 기억
      isLoading: false,
      error: null,

      // 에러 초기화
      clearError: () => set({ error: null }),

      // 체크박스 토글 액션
      toggleItemSelection: (cartItemId) =>
        set((state) => ({
          unselectedItemIds: state.unselectedItemIds.includes(cartItemId)
            ? state.unselectedItemIds.filter((id) => id !== cartItemId) // 해제 목록에서 제거
            : [...state.unselectedItemIds, cartItemId], // 해제 목록에 추가
        })),

      // 전체 선택 / 해제 액션
      setAllSelected: (isSelected, allAvailableIds = []) =>
        set(() => ({
          unselectedItemIds: isSelected ? [] : allAvailableIds,
        })),

      // 서버 장바구니 조회
      fetchCart: async () => {
        if (!checkIsLoggedIn()) return; // 비회원 로컬 유지
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
          try {
            await cartApi.addToCart(product.productId, quantity);
            await get().fetchCart();
          } catch (err) {
            set({ error: err.message });
            throw err;
          }
        } else {
          // 비회원 로컬 처리
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
        set((state) => ({
          cartItems: state.cartItems.filter(
            (item) => item.cartItemId !== cartItemId,
          ),
          // 상품 삭제 시 해제 리스트 청소
          unselectedItemIds: state.unselectedItemIds.filter(
            (id) => id !== cartItemId,
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
        set({ cartItems: [], unselectedItemIds: [] }); // 초기화
      },

      // 비회원 로컬 초기화
      clearLocalCart: () => {
        set({ cartItems: [], unselectedItemIds: [] }); // 초기화
      },

      // 회원/비회원 장바구니 병합
      mergeLocalCartToServer: async () => {
        const allLocalItems = get().cartItems;
        const guestItems = allLocalItems.filter((item) =>
          String(item.cartItemId).startsWith("local_"),
        );

        if (guestItems.length === 0) {
          await get().fetchCart();
          return;
        }

        const failed = [];
        const succeeded = [];

        for (const item of guestItems) {
          try {
            await cartApi.addToCart(item.productId, item.quantity);
            succeeded.push(item.cartItemId);
          } catch (err) {
            failed.push(item);
          }
        }

        // 통신 성공한 로컬 아이템 제거
        if (succeeded.length > 0) {
          set((state) => ({
            cartItems: state.cartItems.filter(
              (i) => !succeeded.includes(i.cartItemId),
            ),
          }));
        }

        await get().fetchCart();

        if (failed.length > 0) {
          set({
            error: `${failed.length}개의 상품을 장바구니로 옮기지 못했습니다.`,
          });
        } else {
          console.log("장바구니 병합 성공!");
        }
      },

      // 장바구니 아이콘 숫자 동기화
      syncCartWithServer: async () => {
        if (!checkIsLoggedIn()) return;
        try {
          const res = await cartApi.getCartCount();
          const serverCount = res.data ? res.data.count : res.count;
          const localCount = get().cartItems.length;

          // 갯수 다르면 다시 갱신
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
      // 새로고침 해도 상태 저장(체크 해제)
      partialize: (state) => ({
        cartItems: state.cartItems,
        unselectedItemIds: state.unselectedItemIds,
      }),
    },
  ),
);

export default useCartStore;

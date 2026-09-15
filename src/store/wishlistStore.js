import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

// Set은 JSON으로 그대로 직렬화되지 않으므로(배열이 아닌 {}로 저장됨)
// 저장/복원 시 배열 <-> Set으로 변환해준다
const setAwareStorage = createJSONStorage(() => localStorage, {
  replacer: (_key, value) =>
    value instanceof Set ? { __type: "Set", values: [...value] } : value,
  reviver: (_key, value) =>
    value && value.__type === "Set" ? new Set(value.values) : value,
});

const useWishlistStore = create(
  persist(
    (set) => ({
      likedIds: new Set(),

      setLikedIds: (productIds) =>
        set({
          likedIds: new Set(productIds),
        }),

      toggleLike: (productId) =>
        set((state) => {
          const next = new Set(state.likedIds);
          if (next.has(productId)) {
            next.delete(productId);
          } else {
            next.add(productId);
          }
          return { likedIds: next };
        }),

      // 로그아웃 시 다음 사용자에게 이전 사용자의 찜 목록이 남아있지 않도록 정리
      clearWishlist: () => set({ likedIds: new Set() }),
    }),
    {
      name: "wishlist-storage",
      storage: setAwareStorage,
    },
  ),
);

export default useWishlistStore;

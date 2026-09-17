import { create } from "zustand";
import { clearCategoryProductsCache } from "../utils/categoryProductsCache";

const useAuthStore = create((set) => ({
  user: null,
  setUser: (user) => {
    clearCategoryProductsCache();
    set({ user });
  },
  clearUser: () => {
    clearCategoryProductsCache();
    set({ user: null });
  },
}));

export default useAuthStore;

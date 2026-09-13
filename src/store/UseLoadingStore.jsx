import { create } from "zustand";

const useLoadingStore = create((set) => ({
  acitvePage: null,
  readyPage: null,

  startPageLoading: (pathname) => {
    set({
      activePage: pathname,
      readyPage: null,
    });
  },

  finishPageLoading: (pathname) => {
    /*set({
      readyPage: pathname,
    });*/
    set((state) => {
      // 이미 다른 페이지로 이동했다면
      // 이전 페이지의 늦은 완료 신호는 무시
      if (state.activePage !== pathname) {
        return state;
      }

      return {
        readyPage: pathname,
      };
    });
  },
}));

export default useLoadingStore;

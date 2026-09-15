import { useEffect } from "react";
import { useLocation } from "react-router";
import useLoadingStore from "../store/UseLoadingStore";

function usePageLoading() {
  const { pathname } = useLocation();

  const finishPageLoading = useLoadingStore((state) => state.finishPageLoading);

  useEffect(() => {
    finishPageLoading(pathname);
  }, [pathname, finishPageLoading]);
}

export default usePageLoading;

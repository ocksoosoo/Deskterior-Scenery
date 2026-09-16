import { useEffect, useState } from "react";

// 화면 폭에 따라 한 행에 들어가는 개수를 반환한다. 창 크기를 드래그로
// 조절할 때 resize 이벤트가 너무 잦아서, debounceMs 동안 멈춰야 반영되게 함
function useResponsiveRowSize({ mobileCount, defaultCount, breakpoint, debounceMs }) {
  const [isMobile, setIsMobile] = useState(
    () => window.innerWidth < breakpoint,
  );

  useEffect(() => {
    let resizeTimer = null;
    const handleResize = () => {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(() => {
        setIsMobile(window.innerWidth < breakpoint);
      }, debounceMs);
    };
    window.addEventListener("resize", handleResize);
    return () => {
      clearTimeout(resizeTimer);
      window.removeEventListener("resize", handleResize);
    };
  }, [breakpoint, debounceMs]);

  return isMobile ? mobileCount : defaultCount;
}

export default useResponsiveRowSize;

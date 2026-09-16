import { useEffect, useState } from "react";

const MOBILE_QUERY = "(max-width: 767px)";

// 모바일 브레이크포인트 여부를 감지해서, 리사이즈해도 실시간으로 갱신해준다
function useIsMobile() {
  const [isMobile, setIsMobile] = useState(
    () => window.matchMedia(MOBILE_QUERY).matches,
  );

  useEffect(() => {
    const mediaQuery = window.matchMedia(MOBILE_QUERY);
    const handleChange = (event) => setIsMobile(event.matches);

    mediaQuery.addEventListener("change", handleChange);
    return () => mediaQuery.removeEventListener("change", handleChange);
  }, []);

  return isMobile;
}

export default useIsMobile;

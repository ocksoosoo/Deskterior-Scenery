import { useLayoutEffect, useRef } from "react";
import { useLocation, useNavigationType } from "react-router";

// 경로별 마지막 스크롤 위치 기억 (모듈 스코프 - 앱이 떠 있는 동안 유지)
const scrollPositions = new Map();

//경로가 바뀔 때마다 스크롤을 맨 위로 올림. (뒤로/앞으로가기는 직전에 있던
//스크롤 위치로 복원해야 하므로 예외로 둔다)
const ScrollRestoration = () => {
  const { pathname, hash } = useLocation();
  const navigationType = useNavigationType();
  const pathnameRef = useRef(pathname);

  // 브라우저 자체의 자동 스크롤 복원이 우리 로직과 다른 시점에 끼어들어 덮어쓰지 않도록 끈다
  useLayoutEffect(() => {
    if ("scrollRestoration" in window.history) {
      window.history.scrollRestoration = "manual";
    }
  }, []);

  // useEffect(passive)는 트리 전체의 layout effect가 다 끝난 뒤에 실행되므로,
  // 이동한 새 페이지의 useLayoutEffect(예: 스크롤 리셋)가 먼저 실행되면서
  // 그 스크롤 이벤트가 여전히 이전 경로로 잘못 기록되는 문제가 있었다.
  // useLayoutEffect로 바꿔서 이 컴포넌트가 App보다 먼저 마운트되는 순서를 이용해
  // 다른 페이지의 layout effect보다 항상 먼저 pathname을 갱신하게 한다.
  useLayoutEffect(() => {
    pathnameRef.current = pathname;
  }, [pathname]);

  // 페이지를 벗어나기 전까지 현재 스크롤 위치를 계속 기록해둔다
  useLayoutEffect(() => {
    const handleScroll = () => {
      scrollPositions.set(pathnameRef.current, window.scrollY);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useLayoutEffect(() => {
    if (hash) return;

    if (navigationType === "POP" && scrollPositions.has(pathname)) {
      // 헤더가 position:sticky로 항상 화면 위를 덮고 있으므로, 그 높이만큼 여유를 두고
      // 복원해서 목표 지점 바로 위 콘텐츠(섹션 제목 등)가 헤더에 가려지지 않게 한다
      const headerHeight = document.querySelector("header")?.getBoundingClientRect().height ?? 0;
      const target = Math.max(0, scrollPositions.get(pathname) - headerHeight);
      // 뒤로가기 시 데이터가 다시 로드되며 페이지 높이가 한동안 작았다가 커지므로,
      // 목표 위치까지 스크롤 가능해질 때(body 높이가 바뀔 때)마다 재시도한다
      let done = false;
      let timeoutId;
      const tryRestore = () => {
        if (done) return;
        const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
        window.scrollTo({ top: Math.min(target, Math.max(maxScroll, 0)), behavior: "instant" });
        if (maxScroll >= target) {
          done = true;
          observer.disconnect();
          clearTimeout(timeoutId);
        }
      };

      const observer = new ResizeObserver(tryRestore);
      observer.observe(document.body);
      tryRestore();

      // 데이터 로딩이 지나치게 오래 걸리는 경우를 대비한 안전장치
      timeoutId = setTimeout(() => {
        done = true;
        observer.disconnect();
      }, 8000);

      return () => {
        done = true;
        clearTimeout(timeoutId);
        observer.disconnect();
      };
    }

    window.scrollTo(0, 0);
  }, [pathname, hash, navigationType]);

  return null;
};

export default ScrollRestoration;

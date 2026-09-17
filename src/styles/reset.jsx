import { css } from "@emotion/react";

export const reset = css`
  /* 폰트 */

  /* font-display: swap이면 폰트가 늦게 도착했을 때 텍스트가 대체 폰트에서
     Pretendard로 뒤늦게 다시 그려지고(스왑), 이 폰트 파일이 2MB나 돼서 그
     시점이 아주 늦어지면 그 재렌더가 LCP(가장 큰 콘텐츠 페인트)로 잡혀버린다.
     optional은 "빨리(대략 100ms 안에) 오면 쓰고, 늦으면 이번 방문에서는
     그냥 대체 폰트로 끝까지 간다"라서 이 늦은 재렌더 자체가 없어진다
     (한 번 캐시되면 다음 방문부터는 바로 Pretendard로 보인다) */
  @font-face {
    font-family: "Pretendard";
    font-weight: 400 700;
    font-display: optional;
    src: url("https://cdn.jsdelivr.net/npm/pretendard@1.3.9/dist/web/variable/woff2/PretendardVariable.woff2")
      format("woff2-variations");
  }

  /* DM Serif Text */
  @font-face {
    font-family: "DM Serif Text";
    font-style: normal;
    font-weight: 400;
    font-display: optional;
    src: url("https://cdn.jsdelivr.net/fontsource/fonts/dm-serif-text@latest/latin-400-normal.woff2")
      format("woff2");
  }

  /* 박스 크기 통일 */
  *,
  *::before,
  *::after {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
  }

  /* 부스, 덜컹방지 */
  html {
    font-size: 16px;
    scroll-behavior: smooth;
    overflow-y: scroll;
    /* 이미지 등 위쪽 콘텐츠 크기 변화에 브라우저가 스크롤 위치를 자동으로 보정하는 것을 막음
       (직접 구현한 스크롤 복원 로직과 충돌해서 위치가 어긋나는 문제 방지) */
    overflow-anchor: none;
  }

  /* 리스트 점박이 제거 */
  ul,
  ol,
  li {
    list-style: none;
  }

  /* 링크 파랑색이랑 밑줄 삭제 */
  a {
    color: inherit;
    text-decoration: none;
  }

  /* 이미지 깨짐 방지 */
  img {
    display: block;
    max-width: 100%;
    height: auto;
  }

  /* 폰트 상속 */
  h1,
  h2,
  h3,
  h4,
  h5,
  h6 {
    font-size: inherit;
    font-weight: inherit;
  }

  /* 브라우저 스타일 초기화 */
  input,
  button,
  textarea,
  select {
    font-family: inherit;
    font-size: inherit;
    color: inherit;
    border: none;
    background: none;
  }

  /* 버튼 호버,비 활성화 */
  button {
    cursor: pointer;
  }

  button:disabled {
    cursor: not-allowed;
  }
  /* 임의 배경색 지워야함 */
  body {
    background-color: #f8f7f2;
    font-family:
      "Pretendard", "Apple SD Gothic Neo", "Malgun Gothic", sans-serif;
  }
`;

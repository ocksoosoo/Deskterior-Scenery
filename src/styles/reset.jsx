import { css } from "@emotion/react";

export const reset = css`
  /* 폰트 */

  @font-face {
    font-family: "Pretendard";
    font-weight: 300 700;
    font-display: swap;
    src: url("https://cdn.jsdelivr.net/npm/pretendard@1.3.9/dist/web/variable/woff2/PretendardVariable.woff2")
      format("woff2-variations");
  }

  /* 🌟 DM Serif Text */
  @font-face {
    font-family: "DM Serif Text";
    font-style: normal;
    font-weight: 400;
    font-display: swap;
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

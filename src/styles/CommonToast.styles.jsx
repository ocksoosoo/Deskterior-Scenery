import styled from "@emotion/styled";
import { SuccessToastStyle } from "./SuccessToast.styles";
import { FailToastStyle } from "./FailToast.styles";

export const ToastBox = styled.div(({ theme }) => ({
  "& .Toastify__toast": {
    width: "400px",
    minHeight: "44px",
    padding: "8px 12px",
    boxSizing: "border-box",
    // 여러 개 쌓일 때 테두리끼리 거의 붙어 보여서 사이 간격을 줌
    marginBottom: theme.spacing["2xs"],

    // 400px 고정폭이면 그보다 좁은 화면(320px 등)에서 화면 밖으로 넘쳐서
    // 잘려 보인다. 뷰포트 폭 기준으로 줄어들되 400px보다 커지지는 않게 함
    [theme.media.mobile]: {
      width: "calc(100vw - 32px)",
    },
  },

  "& .Toastify__toast.success-toast": {
    ...SuccessToastStyle,
  },

  "& .Toastify__toast.fail-toast": {
    ...FailToastStyle,
  },

  "& .Toastify__toast-body": {
    margin: 0,
    padding: 0,
  },

  "& .Toastify__close-button": {
    alignSelf: "center",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    width: "20px",
    height: "20px",
    padding: 0,
    margin: 0,
    opacity: 1,
    color: "#777",
    flexShrink: 0,
    transform: "translateY(4px)",
  },

  "& .Toastify__close-button > svg": {
    width: "20px",
    height: "20px",
  },
}));

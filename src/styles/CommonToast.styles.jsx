import styled from "@emotion/styled";
import { SuccessToastStyle } from "./SuccessToast.styles";
import { FailToastStyle } from "./FailToast.styles";

export const ToastBox = styled.div({
  "& .Toastify__toast": {
    width: "400px",
    minHeight: "44px",
    padding: "8px 12px",
    boxSizing: "border-box",
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
});

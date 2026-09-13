import { toast } from "react-toastify";
import SuccessToast from "./SuccessToast";
import FailToast from "./FailToast";

export const showSuccessToast = (message) => {
  toast(<SuccessToast message={message} />, {
    className: "success-toast",
  });
};

export const showFailToast = (message) => {
  toast(<FailToast message={message} />, {
    className: "fail-toast",
  });
};

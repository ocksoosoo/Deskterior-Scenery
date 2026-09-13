import { IconCircleCheck } from "@tabler/icons-react";
import { SuccessBox, ToastText } from "../../styles/SuccessToast.styles";

function SuccessToast({ message }) {
  return (
    <SuccessBox>
      <IconCircleCheck size={23} />
      <ToastText>{message}</ToastText>
    </SuccessBox>
  );
}

export default SuccessToast;

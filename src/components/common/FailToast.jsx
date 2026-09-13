import { IconAlertTriangle } from "@tabler/icons-react";
import { FailBox, ToastText } from "../../styles/FailToast.styles";

function FailToast({ message }) {
  return (
    <FailBox>
      <IconAlertTriangle size={23} />
      <ToastText>{message}</ToastText>
    </FailBox>
  );
}

export default FailToast;

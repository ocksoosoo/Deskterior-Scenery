import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { ToastBox } from "../../styles/CommonToast.styles";

function Toast() {
  return (
    <ToastBox>
      <ToastContainer
        position="top-center"
        autoClose={3000}
        hideProgressBar={true}
        closeOnClick={true}
        pauseOnHover={false}
        limit={3}
        style={{
          top: "85px",
        }}
      />
    </ToastBox>
  );
}

export default Toast;

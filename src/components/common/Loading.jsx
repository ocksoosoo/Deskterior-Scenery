import { FadeLoader } from "react-spinners";
import { LoadingBox, LoadingText } from "../../styles/Loading.styles";

function Loading() {
  return (
    <LoadingBox>
      <FadeLoader color="#222320" size={40} speedMultiplier={1} />
      <LoadingText>Loading...</LoadingText>
    </LoadingBox>
  );
}

export default Loading;

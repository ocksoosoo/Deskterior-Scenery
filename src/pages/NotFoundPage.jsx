import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import usePageLoading from "../hook/usePageLoading";
import {
  NotFoundBox,
  ErrorContent,
  ErrorNumber,
  ErrorTitle,
  ErrorText,
  TimerText,
  HomeButton,
  Brand,
} from "../styles/NotFoundPage.styles";

function NotFoundPage({ autoRedirect = true }) {
  const [count, setCount] = useState(5);
  const navigate = useNavigate();

  usePageLoading();

  useEffect(() => {
    if (!autoRedirect) return;

    if (count === 0) {
      navigate("/", { replace: true });
      return;
    }

    const timer = setTimeout(() => {
      setCount((time) => time - 1);
    }, 1000);

    return () => clearTimeout(timer);
  }, [autoRedirect, count, navigate]);

  return (
    <NotFoundBox>
      <svg
        width="120"
        height="164"
        viewBox="0 0 120 164"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
      >
        <path
          d="M66 2V114"
          stroke="#FDFDFD"
          strokeWidth="2"
          strokeLinecap="round"
        />

        <path
          d="M35 138C40 122 50 114 66 114C82 114 92 122 97 138"
          stroke="#FDFDFD"
          strokeWidth="2"
          strokeLinecap="round"
        />

        <path
          d="M29 138H103"
          stroke="#FDFDFD"
          strokeWidth="2"
          strokeLinecap="round"
        />

        <path
          d="M57 144C57 149 61 153 66 153C71 153 75 149 75 144"
          stroke="#74766F"
          strokeWidth="2"
          strokeLinecap="round"
        />

        <path
          d="M54 159H78"
          stroke="#74766F"
          strokeWidth="2"
          strokeLinecap="round"
        />
      </svg>

      <ErrorContent>
        <ErrorNumber>404</ErrorNumber>

        <ErrorTitle>페이지를 찾을 수 없습니다.</ErrorTitle>

        <ErrorText>
          요청하신 페이지가 존재하지 않거나 주소가 변경되었을 수 있습니다.
        </ErrorText>
        <TimerText>{count}초 뒤에 메인 페이지로 이동합니다...</TimerText>
      </ErrorContent>

      <HomeButton to="/">Back to Home</HomeButton>

      <Brand>SCENERY</Brand>
    </NotFoundBox>
  );
}

export default NotFoundPage;

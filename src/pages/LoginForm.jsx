import AuthForm from "../components/AuthForm";
import { login } from "../api/authApi";
import useCartStore from "../store/cartStore";
//import loginbanner from "../assets/loginbanner.webp";
import loginbanner from "../assets/login_image.webp";
import useAuthStore from "../store/UseAuthStore";
import usePageLoading from "../hook/usePageLoading";

import {
  LoginPage,
  LoginImage,
  LoginCard,
  Title,
  SignupLink,
  LoginImageWrap,
} from "../styles/LoginForm.styles";

function LoginForm() {
  const setUser = useAuthStore((state) => state.setUser);

  usePageLoading();

  // 장바구니 병합 함수
  const { mergeLocalCartToServer } = useCartStore();

  const handleLogin = async (data) => {
    const result = await login(data);

    localStorage.setItem("token", result.token);

    setUser(result.userInfo);

    // 장바구니 로컬데이터 옮김
    try {
      await mergeLocalCartToServer();
    } catch (error) {
      console.error("장바구니 병합 중 에러 발생:", error);
    }

    return true;
  };

  return (
    <>
      <LoginPage>
        <LoginImageWrap>
          <LoginImage
            src={loginbanner}
            alt="Login banner"
            fetchPriority="high"
          />
        </LoginImageWrap>

        <LoginCard>
          <Title>Log In</Title>

          <AuthForm mode="login" onSubmit={handleLogin} />

          <SignupLink to="/signup" title="회원가입">
            Create an account
          </SignupLink>
        </LoginCard>
      </LoginPage>
    </>
  );
}

export default LoginForm;

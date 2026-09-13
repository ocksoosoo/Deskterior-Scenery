import AuthForm from "../components/AuthForm";
import signupbanner from "../assets/signupbanner.webp";
import { signUp } from "../api/authApi";
import { useEffect } from "react";
import { useLocation } from "react-router";
import useLoadingStore from "../store/UseLoadingStore";
import {
  SignupPage,
  SignupImageWrap,
  SignupImage,
  SignupCard,
  Title,
} from "../styles/SignupForm.styles";

function SignupForm() {
  const { pathname } = useLocation();

  const finishPageLoading = useLoadingStore((state) => state.finishPageLoading);

  useEffect(() => {
    finishPageLoading(pathname);
  }, [pathname, finishPageLoading]);

  const handleSignUp = async (data) => {
    const result = await signUp(data);

    console.log("회원가입 성공:", result);
  };

  return (
    <>
      <SignupPage>
        <SignupImageWrap>
          <SignupImage src={signupbanner} alt="Signup banner" />
        </SignupImageWrap>

        <SignupCard>
          <Title>Create an account</Title>
          <AuthForm mode="signup" onSubmit={handleSignUp} />
        </SignupCard>
      </SignupPage>
    </>
  );
}

export default SignupForm;

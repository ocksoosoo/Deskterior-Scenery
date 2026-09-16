import AuthForm from "../components/AuthForm";
//import signupbanner from "../assets/signupbanner.webp";
import signupbanner from "../assets/SignUp_image.webp";
import { signUp } from "../api/authApi";
import usePageLoading from "../hook/usePageLoading";
import {
  SignupPage,
  SignupImageWrap,
  SignupImage,
  SignupCard,
  Title,
} from "../styles/SignupForm.styles";

function SignupForm() {
  usePageLoading();

  const handleSignUp = async (data) => {
    const result = await signUp(data);

    console.log("회원가입 성공:", result);
  };

  return (
    <>
      <SignupPage>
        <SignupImageWrap>
          <SignupImage
            src={signupbanner}
            alt="Signup banner"
            fetchPriority="high"
          />
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

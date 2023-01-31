import GlobalLayout from "../@common/GlobalLayout";
import {
  SignUpLayout,
  SignUpForm,
  SignUpHeadline,
  LoginLink,
} from "./components";

function SignUp() {
  return (
    <GlobalLayout>
      <SignUpLayout>
        <SignUpHeadline />
        <SignUpForm />
        <LoginLink />
      </SignUpLayout>
    </GlobalLayout>
  );
}

export default SignUp;

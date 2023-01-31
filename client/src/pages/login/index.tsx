import GlobalLayout from "@/common/components/GlobalLayout";
import {
  LoginLayout,
  LoginHeadline,
  LoginForm,
  SignUpLink,
} from "./components";

function Login() {
  return (
    <GlobalLayout>
      <LoginLayout>
        <LoginHeadline />
        <LoginForm />
        <SignUpLink />
      </LoginLayout>
    </GlobalLayout>
  );
}

export default Login;

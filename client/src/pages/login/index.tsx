import React from "react";
import GlobalLayout from "../@common/GlobalLayout";
import { LoginLayout, LoginContent } from "./components";

function Login() {
  return (
    <GlobalLayout>
      <LoginLayout>
        <LoginContent />
      </LoginLayout>
    </GlobalLayout>
  );
}

export default Login;

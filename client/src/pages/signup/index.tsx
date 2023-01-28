import React from "react";
import GlobalLayout from "../@common/GlobalLayout";
import { SignUpLayout, SignUpForm } from "./components";

function SignUp() {
  return (
    <GlobalLayout>
      <SignUpLayout>
        <SignUpForm />
      </SignUpLayout>
    </GlobalLayout>
  );
}

export default SignUp;

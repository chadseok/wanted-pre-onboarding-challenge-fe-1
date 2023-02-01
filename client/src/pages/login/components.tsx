import React from "react";
import { Link } from "react-router-dom";
import { useLogin } from "./hooks";
import ERROR_MSG from "@/common/constants/errorMsg";

export function LoginLayout(props: { children: React.ReactNode }) {
  return (
    <div className="w-96 bg-white rounded-lg shadow-md overflow-hidden p-4 flex flex-col">
      {props.children}
    </div>
  );
}

export function LoginHeadline() {
  return <h1 className="text-2xl font-bold text-blue-500 mb-4">로그인</h1>;
}
export function LoginForm() {
  const [email, setEmail] = React.useState<string>("");
  const [password, setPassword] = React.useState<string>("");
  const [emailAlertMsg, setEmailAlertMsg] = React.useState<string | null>();
  const [loginAlertMsg, setLoginAlertMsg] = React.useState<string | null>();
  const { mutate } = useLogin();

  const handleLogin = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    mutate(
      { email, password },
      {
        onError: () => {
          setLoginAlertMsg(ERROR_MSG.notMemberloginFailure);
        },
      }
    );
  };

  const isBtnDisabled = () => {
    if (email === "" || password === "") return true;
    else return false;
  };

  const checkEmailValidation = () => {
    const result = new RegExp(
      /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/
    ).test(email);

    if (result || email === "") setEmailAlertMsg(null);
    else setEmailAlertMsg(ERROR_MSG.notValidEmail);
  };

  return (
    <form className="flex flex-col gap-2 w-full" onSubmit={handleLogin}>
      <input
        className={`w-full border rounded-sm h-12 py-4 px-2 ${
          emailAlertMsg || loginAlertMsg
            ? "border-red-500"
            : "border-slate-300 focus:border-blue-500"
        }`}
        type="email"
        placeholder="이메일"
        value={email}
        onBlur={checkEmailValidation}
        onChange={(e) => setEmail(e.target.value)}
      />
      {emailAlertMsg && (
        <div className="text-red-500 font-semibold text-xs">
          {emailAlertMsg}
        </div>
      )}
      <input
        className={`w-full border rounded-sm h-12 py-4 px-2 ${
          loginAlertMsg
            ? "border-red-500"
            : "border-slate-300  focus:border-blue-500"
        }`}
        type="password"
        placeholder="비밀번호"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      {loginAlertMsg && (
        <div className="text-red-500 font-semibold text-xs">
          {loginAlertMsg}
        </div>
      )}
      <button
        className="w-full rounded-sm h-12 my-4 font-semibold bg-blue-500 rounded-3xl text-white disabled:opacity-30"
        type="submit"
        disabled={isBtnDisabled()}
      >
        이메일로 계속하기
      </button>
    </form>
  );
}

export function SignUpLink() {
  return (
    <div className="text-center">
      <span className="text-sm">아직 계정이 없나요? </span>
      <Link to="/signup" className="text-blue-700 text-sm mt-2 underline">
        회원가입하기
      </Link>
    </div>
  );
}

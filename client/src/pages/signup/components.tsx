import React from "react";
import { Link } from "react-router-dom";
import { useSignUp } from "./hooks";

export function SignUpLayout(props: { children: React.ReactNode }) {
  return (
    <div className="w-96 bg-white rounded-lg shadow-md overflow-hidden p-4">
      {props.children}
    </div>
  );
}

export function SignUpHeadline() {
  return <h1 className="text-2xl font-bold text-blue-500 mb-4">회원가입</h1>;
}

export function SignUpForm() {
  const [email, setEmail] = React.useState<string>("");
  const [password, setPassword] = React.useState<string>("");
  const [passwordCheck, setPasswordCheck] = React.useState<string>("");
  const [emailAlertMsg, setEmailAlertMsg] = React.useState<string | null>("");
  const [passwordAlertMsg, setPasswordAlertMsg] = React.useState<string | null>(
    ""
  );
  const [passwordCheckAlertMsg, setPasswordCheckAlertMsg] = React.useState<
    string | null
  >("");
  const { mutate } = useSignUp();

  const handleSignUp = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    mutate(
      { email, password },
      {
        onError: () => {
          setEmailAlertMsg("이미 존재하는 이메일입니다");
        },
      }
    );
  };

  const isBtnDisabled = () => {
    if (
      email === "" ||
      password === "" ||
      passwordCheck === "" ||
      emailAlertMsg ||
      passwordAlertMsg ||
      passwordCheckAlertMsg
    )
      return true;
    else return false;
  };

  const checkEmailValidation = () => {
    const result = new RegExp(
      /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/
    ).test(email);

    if (result || email === "") setEmailAlertMsg(null);
    else setEmailAlertMsg("올바른 이메일 형식 아닙니다");
  };

  const handlePasswordInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = event.target.value;
    setPassword(newValue);

    if (newValue.length < 8) setPasswordAlertMsg("8자 이상 입력해주십시오");
    else setPasswordAlertMsg(null);

    if (passwordCheck !== "" && passwordCheck !== newValue)
      setPasswordCheckAlertMsg("입력한 비밀번호가 같지 않습니다");
    else setPasswordCheckAlertMsg(null);
  };

  const handlePasswordCheckInput = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const newValue = event.target.value;
    setPasswordCheck(newValue);

    if (password !== newValue)
      setPasswordCheckAlertMsg("입력한 비밀번호가 같지 않습니다");
    else setPasswordCheckAlertMsg(null);
  };

  return (
    <form className="flex flex-col" onSubmit={handleSignUp}>
      <label
        htmlFor="email"
        className={`text-sm mt-4 ${
          emailAlertMsg ? "text-red-500" : "text-slate-400"
        }`}
      >
        아이디
      </label>
      <input
        id="email"
        type="email"
        className={`h-12 border rounded-md p-2 ${
          emailAlertMsg
            ? "border-red-500"
            : "border-slate-300 focus:border-blue-500"
        }`}
        value={email}
        onBlur={checkEmailValidation}
        onChange={(e) => setEmail(e.target.value)}
      />
      {emailAlertMsg && (
        <div className="text-red-500 font-semibold text-xs">
          {emailAlertMsg}
        </div>
      )}
      <label
        htmlFor="password"
        className={`text-sm mt-4 ${
          passwordAlertMsg || passwordCheckAlertMsg
            ? "text-red-500"
            : "text-slate-400"
        }`}
      >
        비밀번호
      </label>
      <input
        type="password"
        id="password"
        className={`h-12 border rounded-md p-2 ${
          passwordAlertMsg || passwordCheckAlertMsg
            ? "border-red-500"
            : "border-slate-300 focus:border-blue-500"
        }`}
        value={password}
        onChange={handlePasswordInput}
      />
      {passwordAlertMsg && (
        <div className="text-red-500 font-semibold text-xs">
          {passwordAlertMsg}
        </div>
      )}
      <label
        htmlFor="passwordcheck"
        className={`text-sm mt-4 ${
          passwordCheckAlertMsg ? "text-red-500" : "text-slate-400"
        }`}
      >
        비밀번호 확인
      </label>
      <input
        type="password"
        id="passwordcheck"
        className={`h-12 border rounded-md p-2 ${
          passwordCheckAlertMsg
            ? "border-red-500"
            : "border-slate-300 focus:border-blue-500"
        }`}
        value={passwordCheck}
        onChange={handlePasswordCheckInput}
      />
      {passwordCheckAlertMsg && (
        <div className="text-red-500 font-semibold text-xs">
          {passwordCheckAlertMsg}
        </div>
      )}
      <button
        className="rounded-2xl bg-blue-500 my-4 text-white h-12 font-semibold disabled:opacity-30"
        disabled={isBtnDisabled()}
      >
        회원가입
      </button>
    </form>
  );
}

export function LoginLink() {
  return (
    <div className="text-center">
      <span className="text-sm">이미 계정이 있나요? </span>
      <Link to="/signup" className="text-blue-700 text-sm mt-2 underline">
        로그인
      </Link>
    </div>
  );
}

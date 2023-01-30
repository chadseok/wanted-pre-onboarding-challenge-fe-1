import React from "react";
import { useSignUp } from "./hooks";

export function SignUpLayout(props: { children: React.ReactNode }) {
  return (
    <div className="w-96 bg-white rounded-lg shadow-md overflow-hidden p-4">
      {props.children}
    </div>
  );
}

export function SignUpForm() {
  const [email, setEmail] = React.useState<string>("");
  const [password, setPassword] = React.useState<string>("");
  const [passwordcheck, setPasswordcheck] = React.useState<string>("");
  const { mutate } = useSignUp();

  const handleSignUp = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    mutate({ email, password });
  };

  return (
    <form className="flex flex-col gap-2" onSubmit={handleSignUp}>
      <h3 className="text-slate-400 text-sm">아이디</h3>
      <input
        type="email"
        className="h-12 mb-2 border rounded-md p-2"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <h3 className="text-slate-400 text-sm">비밀번호</h3>
      <input
        type="password"
        className="h-12 mb-2 border rounded-md p-2"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <h3 className="text-slate-400 text-sm">비밀번호 확인</h3>
      <input
        type="password"
        className="h-12 mb-2 border rounded-md p-2"
        value={passwordcheck}
        onChange={(e) => setPasswordcheck(e.target.value)}
      />
      <button className="rounded-2xl bg-blue-500 text-white h-12 font-semibold">
        회원가입
      </button>
    </form>
  );
}

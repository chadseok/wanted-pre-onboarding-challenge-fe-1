import React from "react";
import { SignUpLinkBtn } from "./components";
import { useLogin } from "./hooks";

function Login() {
  const { email, setEmail, password, setPassword, handleLogin } = useLogin();

  return (
    <div className="h-screen flex justify-center items-center bg-blue-50">
      <div className="w-96 bg-white rounded-lg shadow-md overflow-hidden px-8 py-4 flex flex-col items-center">
        <h1 className="text-2xl font-bold text-blue-500 mb-4">로그인</h1>
        <form className="flex flex-col gap-2 w-full" onSubmit={handleLogin}>
          <input
            className="w-full border border-slate-300 rounded-sm h-12 py-4 px-2 bg-slate-100"
            type="email"
            placeholder="이메일"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <div className="h-4"></div>
          <input
            className="w-full border border-slate-300 rounded-sm h-12 py-4 px-2 bg-slate-100"
            type="password"
            placeholder="비밀번호"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <div className="h-4"></div>
          <button className="w-full rounded-sm h-12 font-semibold bg-blue-500 rounded-3xl text-white">
            이메일로 계속하기
          </button>
        </form>
        <SignUpLinkBtn />
      </div>
    </div>
  );
}

export default Login;

import React from "react";
import { useNavigate } from "react-router-dom";
import { api } from "../api";

export function useLogin() {
  const navigate = useNavigate();
  const [email, setEmail] = React.useState<string>("");
  const [password, setPassword] = React.useState<string>("");

  const handleLogin = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    api
      .post("/users/login", { email, password })
      .then((res) => {
        localStorage.setItem("AUTH_TOKEN", res.data.token);
        api.defaults.headers.Authorization = res.data.token;
        navigate("/");
      })
      .catch((err) => console.error(err));
  };

  return { email, setEmail, password, setPassword, handleLogin };
}

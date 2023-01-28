import React from "react";
import { useNavigate } from "react-router-dom";
import fetchInstance from "../@common/fetchInstance";

export function useLogin() {
  const navigate = useNavigate();
  const [email, setEmail] = React.useState<string>("");
  const [password, setPassword] = React.useState<string>("");

  const handleLogin = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    fetchInstance
      .post("/users/login", { email, password })
      .then((res) => {
        localStorage.setItem("AUTH_TOKEN", res.data.token);
        navigate("/");
      })
      .catch((err) => console.error(err));
  };

  return { email, setEmail, password, setPassword, handleLogin };
}

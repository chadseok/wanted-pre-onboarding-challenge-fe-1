import React from "react";
import { useNavigate } from "react-router-dom";
import { api } from "../@common/api";

export function useSignUp() {
  const navigate = useNavigate();
  const [email, setEmail] = React.useState<string>("");
  const [password, setPassword] = React.useState<string>("");
  const [passwordcheck, setPasswordcheck] = React.useState<string>("");

  const handleSignUp = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    api
      .post("/users/create", { email, password })
      .then(() => {
        navigate("/login");
      })
      .catch((err) => console.error(err));
  };

  return {
    email,
    setEmail,
    password,
    setPassword,
    passwordcheck,
    setPasswordcheck,
    handleSignUp,
  };
}

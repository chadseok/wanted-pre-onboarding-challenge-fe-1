import React from "react";
import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import fetchInstance from "../@common/fetchInstance";

const loginApi = (value: { email: string; password: string }) =>
  fetchInstance.post("/users/login", value);

export function useLogin() {
  const navigate = useNavigate();

  return useMutation({
    mutationFn: loginApi,
    onSuccess: (res) => {
      localStorage.setItem("AUTH_TOKEN", res.data.token);
      navigate("/");
    },
  });
}

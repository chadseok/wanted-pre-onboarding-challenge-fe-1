import React from "react";
import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import fetchInstance from "@/common/utils/fetchInstance";
import STORAGE from "@/common/constants/storage";

const loginApi = (value: { email: string; password: string }) =>
  fetchInstance.post("/users/login", value);

export function useLogin() {
  const navigate = useNavigate();

  return useMutation({
    mutationFn: loginApi,
    onSuccess: (res) => {
      localStorage.setItem(STORAGE.authToken, res.data.token);
      navigate("/");
    },
  });
}

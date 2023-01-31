import React from "react";
import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import fetchInstance from "../../common/utils/fetchInstance";

const signUpApi = (value: { email: string; password: string }) =>
  fetchInstance.post("/users/create", value);

export function useSignUp() {
  const navigate = useNavigate();
  return useMutation({
    mutationFn: signUpApi,
    onSuccess: () => {
      navigate("/login");
    },
  });
}

import axios from "axios";

const token = localStorage.getItem("AUTH_TOKEN");

export const api = axios.create({
  baseURL: "http://localhost:8080",
  headers: {
    Authorization: token ? `Bearer ${token}` : null,
  },
});

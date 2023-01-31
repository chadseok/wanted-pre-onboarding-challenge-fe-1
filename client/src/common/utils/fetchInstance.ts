import axios, { AxiosRequestConfig } from "axios";

const fetchInstance = axios.create({ baseURL: "http://localhost:8080" });

fetchInstance.interceptors.request.use(setTokenConfig);

function setTokenConfig(config: AxiosRequestConfig) {
  const token = localStorage.getItem("AUTH_TOKEN");
  config.headers.Authorization = token ? `Bearer ${token}` : null;
  return config;
}
export default fetchInstance;

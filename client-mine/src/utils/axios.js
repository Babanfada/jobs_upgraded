import axios from "axios";
import { getUserFromLocalStorage } from "./localStorage";

const customFetch = axios.create({
    // baseURL: "https://jobs-api-users-info-api.vercel.app/api/v1/",
    baseURL: "https://jobify-prod.herokuapp.com/api/v1/toolkit",
//   baseURL: "https://localhost:5001/api/v1",
});

customFetch.interceptors.request.use((config) => {
  const user = getUserFromLocalStorage();
  if (user) {
    config.headers["Authorization"] = `Bearer ${user.token}`;
  }
  return config;
});

export default customFetch;

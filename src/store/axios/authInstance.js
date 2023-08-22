import axios from "axios";
import { getToken } from "../localStorage";

const authInstance = axios.create({
  baseURL: `${process.env.REACT_APP_BACKEND_URL}/auth`,
});

authInstance.interceptors.request.use(
  async (config) => {
    config.headers = {
      Authorization: `Bearer ${getToken()}`,
    };
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default authInstance;

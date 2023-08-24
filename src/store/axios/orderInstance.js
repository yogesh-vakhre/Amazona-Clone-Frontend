import axios from "axios";
import { getToken } from "../localStorage";

const orderInstance = axios.create({
  baseURL: `${process.env.REACT_APP_BACKEND_URL}/orders`,
});

orderInstance.interceptors.request.use(
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

export default orderInstance;

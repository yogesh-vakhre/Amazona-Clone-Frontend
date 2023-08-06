import axios from "axios";
import { getToken } from "../localStorage";

const productInstance = axios.create({
  baseURL: `${process.env.REACT_APP_BACKEND_URL}/products`,
});

productInstance.interceptors.request.use(
  async (config) => {
    config.headers = {
      Authorization: `Bearer ${getToken()}`,
    };

    return config;
  },
  (error) => {
    Promise.reject(error);
  }
);

export default productInstance;

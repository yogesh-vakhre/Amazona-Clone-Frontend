import authInstance from "../axios/authInstance";
import { toast } from "react-toastify";

const signIn = async (data) => {
  try {
    const response = await authInstance
      .post("/sign-in", data)
      .catch(function (error) {
        toast.error(error.response.data.message);
        return console.error(error.response.data);
      });
    return response.data;
  } catch (error) {
    return console.error(error);
  }
};

const signUp = async (data) => {
  try {
    const response = await authInstance
      .post("/sign-up", data)
      .catch(function (error) {
        toast.error(error.response.data.message);
        return console.error(error.response.data);
      });
    return response.data;
  } catch (error) {
    return console.error(error);
  }
};

const updateProfile = async (data) => {
  try {
    const response = await authInstance
      .patch("/edit-user", data)
      .catch(function (error) {
        toast.error(error.response.data.message);
        return console.error(error.response.data);
      });
    return response.data;
  } catch (error) {
    return console.error(error);
  }
};

const forgetPassword = async (data) => {
  try {
    const response = await authInstance
      .post("/forgot-password", data)
      .catch(function (error) {
        toast.error(error.response.data.message);
        return console.error(error.response.data);
      });
    return response.data;
  } catch (error) {
    return console.error(error);
  }
};

const resetPassword = async ({ token, data }) => {
  try {
    const response = await authInstance
      .patch(`/reset-password/${token}`, data)
      .catch(function (error) {
        toast.error(error.response.data.message);
        return console.error(error.response.data);
      });
    return response.data;
  } catch (error) {
    return console.error(error);
  }
};

const emailVerification = async (token) => {
  const response = await authInstance.get(`/email-verification/${token}`);
  return response.data;
};

const getProfile = async () => {
  const response = await authInstance.get(`/get-profile`);
  return response.data;
};

const AuthService = {
  signIn,
  signUp,
  updateProfile,
  forgetPassword,
  resetPassword,
  emailVerification,
  getProfile,
};
export default AuthService;

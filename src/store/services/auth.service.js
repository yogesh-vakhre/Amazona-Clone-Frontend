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

const AuthService = {
  signIn,
  signUp,
  updateProfile,
};
export default AuthService;

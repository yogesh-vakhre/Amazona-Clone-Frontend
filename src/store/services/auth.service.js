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

const AuthService = {
  signIn,
};
export default AuthService;

import authInstance from "../axios/authInstance";

const signIn = async (data) => await authInstance.post("/sign-in", data);

const signUp = async (data) => await authInstance.post("/sign-up", data);

const updateProfile = async (data) =>
  await authInstance.patch("/edit-user", data);

const forgetPassword = async (data) =>
  await authInstance.post("/forgot-password", data);

const resetPassword = async ({ token, data }) =>
  await authInstance.patch(`/reset-password/${token}`, data);

const emailVerification = async (token) =>
  await authInstance.get(`/email-verification/${token}`);

const getProfile = async () => await authInstance.get(`/get-profile`);

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

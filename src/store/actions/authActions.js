import {
  EMAIL_VERIFICATION_ERROR,
  EMAIL_VERIFICATION_START,
  EMAIL_VERIFICATION_SUCCESS,
  FORGET_PASSWORD_ERROR,
  FORGET_PASSWORD_START,
  FORGET_PASSWORD_SUCCESS,
  LOAD_PROFILE_ERROR,
  LOAD_PROFILE_START,
  LOAD_PROFILE_SUCCESS,
  RESET_PASSWORD_ERROR,
  RESET_PASSWORD_START,
  RESET_PASSWORD_SUCCESS,
  SIGN_IN_ERROR,
  SIGN_IN_START,
  SIGN_IN_SUCCESS,
  SIGN_OUT_ERROR,
  SIGN_OUT_START,
  SIGN_OUT_SUCCESS,
  SIGN_UP_ERROR,
  SIGN_UP_START,
  SIGN_UP_SUCCESS,
  UPDATE_PROFILE_ERROR,
  UPDATE_PROFILE_START,
  UPDATE_PROFILE_SUCCESS,
} from "../action-types/authActionTypes";

export const signInStart = (user) => ({
  type: SIGN_IN_START,
  payload: user,
});

export const signInSucess = (data) => ({
  type: SIGN_IN_SUCCESS,
  payload: data,
});

export const signInError = (error) => ({
  type: SIGN_IN_ERROR,
  payload: error,
});

export const signUpStart = (user) => ({
  type: SIGN_UP_START,
  payload: user,
});

export const signUpSucess = (data) => ({
  type: SIGN_UP_SUCCESS,
  payload: data,
});

export const signUpError = (error) => ({
  type: SIGN_UP_ERROR,
  payload: error,
});

export const updateProfileStart = (user) => ({
  type: UPDATE_PROFILE_START,
  payload: user,
});

export const updateProfileSucess = (data) => ({
  type: UPDATE_PROFILE_SUCCESS,
  payload: data,
});

export const updateProfileError = (error) => ({
  type: UPDATE_PROFILE_ERROR,
  payload: error,
});

export const signOutStart = () => ({
  type: SIGN_OUT_START,
});

export const signOutSucess = (data) => ({
  type: SIGN_OUT_SUCCESS,
  payload: data,
});

export const signOutError = (error) => ({
  type: SIGN_OUT_ERROR,
  payload: error,
});

export const forgetPasswordStart = (user) => ({
  type: FORGET_PASSWORD_START,
  payload: user,
});

export const forgetPasswordSucess = (data) => ({
  type: FORGET_PASSWORD_SUCCESS,
  payload: data,
});

export const forgetPasswordError = (error) => ({
  type: FORGET_PASSWORD_ERROR,
  payload: error,
});

export const resetPasswordStart = (user) => ({
  type: RESET_PASSWORD_START,
  payload: user,
});

export const resetPasswordSucess = (data) => ({
  type: RESET_PASSWORD_SUCCESS,
  payload: data,
});

export const resetPasswordError = (error) => ({
  type: RESET_PASSWORD_ERROR,
  payload: error,
});

export const emailVerificationStart = (user) => ({
  type: EMAIL_VERIFICATION_START,
  payload: user,
});

export const emailVerificationSucess = (data) => ({
  type: EMAIL_VERIFICATION_SUCCESS,
  payload: data,
});

export const emailVerificationError = (error) => ({
  type: EMAIL_VERIFICATION_ERROR,
  payload: error,
});

export const loadProfileStart = (user) => ({
  type: LOAD_PROFILE_START,
  payload: user,
});

export const loadProfileSucess = (data) => ({
  type: LOAD_PROFILE_SUCCESS,
  payload: data,
});

export const loadProfileError = (error) => ({
  type: LOAD_PROFILE_ERROR,
  payload: error,
});

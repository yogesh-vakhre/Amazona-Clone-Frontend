import {
  SIGN_IN_ERROR,
  SIGN_IN_START,
  SIGN_IN_SUCCESS,
  SIGN_OUT_ERROR,
  SIGN_OUT_START,
  SIGN_OUT_SUCCESS,
  SIGN_UP_ERROR,
  SIGN_UP_START,
  SIGN_UP_SUCCESS,
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

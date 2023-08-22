import {
  SIGN_IN_ERROR,
  SIGN_IN_START,
  SIGN_IN_SUCCESS,
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

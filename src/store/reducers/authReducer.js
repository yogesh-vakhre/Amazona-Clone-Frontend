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

import { getUserInfo } from "../localStorage";

const initialState = {
  isSignedIn: getUserInfo() !== undefined ? true : false,
  user: getUserInfo() ?? {},
  error: "",
  loader: false,
  success: false,
};

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case SIGN_IN_START:
    case SIGN_UP_START:
    case UPDATE_PROFILE_START:
    case FORGET_PASSWORD_START:
    case RESET_PASSWORD_START:
    case EMAIL_VERIFICATION_START:
      return { ...state, user: action.payload, loader: true };
    case LOAD_PROFILE_START:
    case SIGN_OUT_START:
      return { ...state, loader: true };
    case SIGN_IN_SUCCESS:
    case SIGN_UP_SUCCESS:
    case UPDATE_PROFILE_SUCCESS:
    case LOAD_PROFILE_SUCCESS:
      return {
        ...state,
        user: action.payload.user,
        isSignedIn: true,
        loader: false,
        success: true,
      };
    case RESET_PASSWORD_SUCCESS:
    case EMAIL_VERIFICATION_SUCCESS:
    case SIGN_OUT_SUCCESS:
      return {
        ...state,
        user: {},
        isSignedIn: false,
        error: "",
        loader: false,
        success: true,
      };
    case FORGET_PASSWORD_SUCCESS:
      return {
        ...state,
        user: action.payload.message,
        error: "",
        loader: false,
        success: true,
      };
    case SIGN_IN_ERROR:
    case SIGN_UP_ERROR:
    case UPDATE_PROFILE_ERROR:
    case FORGET_PASSWORD_ERROR:
    case RESET_PASSWORD_ERROR:
    case SIGN_OUT_ERROR:
    case EMAIL_VERIFICATION_ERROR:
    case LOAD_PROFILE_ERROR:
      return {
        ...state,
        error: action.payload,
        loader: false,
        success: false,
      };
    default:
      return state;
  }
};
export default authReducer;

import { takeLatest, put, all, fork, call } from "redux-saga/effects";
import {
  FORGET_PASSWORD_START,
  SIGN_IN_START,
  SIGN_OUT_START,
  SIGN_UP_START,
  UPDATE_PROFILE_START,
} from "../action-types/authActionTypes";
import {
  forgetPasswordError,
  forgetPasswordSucess,
  signInError,
  signInSucess,
  signOutError,
  signOutSucess,
  signUpError,
  signUpSucess,
  updateProfileError,
  updateProfileSucess,
} from "../actions/authActions";
import AuthService from "../services/auth.service";
import {
  deleteToken,
  deleteUserInfo,
  saveToken,
  saveUserInfo,
} from "../localStorage";
import { toast } from "react-toastify";

function* onSignInStartAsync({ payload }) {
  try {
    console.log("Call_Saga_Get_Sign_In_Start_Payload", payload);
    const response = yield call(AuthService.signIn, payload);
    console.log("Call_Saga_Get_Sign_In_Start", response.data);

    if (response?.status === "success") {
      const { user, token } = response;
      if (user?.status !== "Blocked" && user?.status !== "Suspended") {
        saveToken(token);
        saveUserInfo(user);
        yield put(signInSucess(response));
      }
      yield put(signInSucess(response));
    }
  } catch (error) {
    yield put(signInError(error.response));
  }
}

function* onSignUpStartAsync({ payload }) {
  try {
    console.log("Call_Saga_Get_Sign_Up_Start_Payload", payload);
    const response = yield call(AuthService.signUp, payload);
    console.log("Call_Saga_Get_Sign_Up_Start", response.data);

    if (response?.status === "success") {
      const { user, token } = response;
      if (user?.status !== "Blocked" && user?.status !== "Suspended") {
        saveToken(token);
        saveUserInfo(user);
        yield put(signUpSucess(response));
      }
      yield put(signUpSucess(response));
    }
  } catch (error) {
    yield put(signUpError(error.response));
  }
}

function* onUpdateProfileStartAsync({ payload }) {
  try {
    console.log("Call_Saga_Get_Update_Profile_Start_Payload", payload);
    const response = yield call(AuthService.updateProfile, payload);
    console.log("Call_Saga_Get_Update_Profile_Start", response);
    if (response?.status === "success") {
      const { user } = response;
      saveUserInfo(user);
      yield put(updateProfileSucess(response));
      toast.success(response.message);
    } else {
      yield put(updateProfileError("Something Went Wrong, Please Try Again!"));
      toast.error("Something Went Wrong, Please Try Again!");
    }
  } catch (error) {
    yield put(updateProfileError(error.response));
  }
}

function* onSignOutStartAsync({ payload }) {
  try {
    console.log("Call_Saga_Get_Sign_Out_Start");
    deleteToken();
    deleteUserInfo();
    yield put(signOutSucess());
    toast.success("You have successfully signed out!");
  } catch (error) {
    yield put(signOutError(error.response));
  }
}

function* onforgetPasswordStartAsync({ payload }) {
  try {
    console.log("Call_Saga_Get_Forget_Password_Start_Payload", payload);
    const response = yield call(AuthService.forgetPassword, payload);
    console.log("Call_Saga_Get_Forget_Password_Start", response.data);

    if (response?.status === "success") {
      yield put(forgetPasswordSucess(response));
      toast.success(response.message);
    }
  } catch (error) {
    yield put(forgetPasswordError(error.response));
  }
}

export function* onSignInStart() {
  yield takeLatest(SIGN_IN_START, onSignInStartAsync);
}

export function* onSignUpStart() {
  yield takeLatest(SIGN_UP_START, onSignUpStartAsync);
}

export function* onUpdateProfileStart() {
  yield takeLatest(UPDATE_PROFILE_START, onUpdateProfileStartAsync);
}

export function* onSignOutStart() {
  yield takeLatest(SIGN_OUT_START, onSignOutStartAsync);
}

export function* onforgetPasswordStart() {
  yield takeLatest(FORGET_PASSWORD_START, onforgetPasswordStartAsync);
}

const authSagas = [
  fork(onSignInStart),
  fork(onSignUpStart),
  fork(onUpdateProfileStart),
  fork(onSignOutStart),
  fork(onforgetPasswordStart),
];

export default function* authSaga() {
  yield all([...authSagas]);
}

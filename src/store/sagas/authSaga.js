import { takeLatest, put, all, fork, call } from "redux-saga/effects";
import { SIGN_IN_START, SIGN_OUT_START } from "../action-types/authActionTypes";
import {
  signInError,
  signInSucess,
  signOutError,
  signOutSucess,
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

export function* onSignInStart() {
  yield takeLatest(SIGN_IN_START, onSignInStartAsync);
}

export function* onSignOutStart() {
  yield takeLatest(SIGN_OUT_START, onSignOutStartAsync);
}

const authSagas = [fork(onSignInStart), fork(onSignOutStart)];

export default function* authSaga() {
  yield all([...authSagas]);
}

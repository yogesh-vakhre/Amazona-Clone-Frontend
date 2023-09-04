import {
  takeLatest,
  put,
  all,
  fork,
  call,
  takeEvery,
} from "redux-saga/effects";
import {
  EMAIL_VERIFICATION_START,
  FORGET_PASSWORD_START,
  LOAD_PROFILE_START,
  RESET_PASSWORD_START,
  SIGN_IN_START,
  SIGN_OUT_START,
  SIGN_UP_START,
  UPDATE_PROFILE_START,
} from "../action-types/authActionTypes";
import {
  emailVerificationError,
  emailVerificationSucess,
  forgetPasswordError,
  forgetPasswordSucess,
  loadProfileError,
  loadProfileSucess,
  resetPasswordError,
  resetPasswordSucess,
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
import cartLocalStorage from "../localStorage/cart.localStorage";
import { toast } from "react-toastify";
import { getError } from "../../utils/getError";

function* onSignInStartAsync({ payload }) {
  try {
    console.log("Call_Saga_Get_Sign_In_Payload", payload);
    const response = yield call(AuthService.signIn, payload);
    console.log("Call_Saga_Get_Sign_In_Response", response.data);

    if (response?.data?.status === "success") {
      const { user, token } = response.data;
      if (user?.status !== "Blocked" && user?.status !== "Suspended") {
        saveToken(token);
        saveUserInfo(user);
        yield put(signInSucess(response));
      }
      yield put(signInSucess(response));
    }
  } catch (error) {
    yield put(signInError(getError(error)));
    toast.error(getError(error));
  }
}

function* onSignUpStartAsync({ payload }) {
  try {
    console.log("Call_Saga_Get_Sign_Up_Payload", payload);
    const response = yield call(AuthService.signUp, payload);
    console.log("Call_Saga_Get_Sign_Up_Response", response.data);

    if (response?.data?.status === "success") {
      const { user, token } = response.data;
      if (user?.status !== "Blocked" && user?.status !== "Suspended") {
        saveToken(token);
        saveUserInfo(user);
        yield put(signUpSucess(response.data));
      }
      yield put(signUpSucess(response.data));
    }
  } catch (error) {
    yield put(signUpError(getError(error)));
    toast.error(getError(error));
  }
}

function* onUpdateProfileStartAsync({ payload }) {
  try {
    console.log("Call_Saga_Get_Update_Profile_Payload", payload);
    const response = yield call(AuthService.updateProfile, payload);
    console.log("Call_Saga_Get_Update_Profile_Response", response);
    if (response?.data?.status === "success") {
      const { user } = response.data;
      saveUserInfo(user);
      yield put(updateProfileSucess(response));
      toast.success(response.message);
    } else {
      yield put(updateProfileError("Something Went Wrong, Please Try Again!"));
    }
  } catch (error) {
    yield put(updateProfileError(getError(error)));
    toast.error(getError(error));
  }
}

function* onSignOutStartAsync() {
  try {
    console.log("Call_Saga_Get_Sign_Out");
    deleteToken();
    deleteUserInfo();
    cartLocalStorage.deleteCartItems();
    cartLocalStorage.deleteShippingAddress();
    cartLocalStorage.deletePaymentMethod();
    yield put(signOutSucess());
  } catch (error) {
    yield put(signOutError(getError(error)));
    toast.error(getError(error));
  }
}

function* onForgetPasswordStartAsync({ payload }) {
  try {
    console.log("Call_Saga_Get_Forget_Password_Payload", payload);
    const response = yield call(AuthService.forgetPassword, payload);
    console.log("Call_Saga_Get_Forget_Password_Response", response.data);

    if (response?.data?.status === "success") {
      yield put(forgetPasswordSucess(response.data));
      toast.success(response.data.message);
    }
  } catch (error) {
    yield put(forgetPasswordError(getError(error)));
    toast.error(getError(error));
  }
}

function* onResetPasswordStartAsync({ payload }) {
  try {
    console.log("Call_Saga_Get_Reset_Password_Payload", payload);
    const response = yield call(AuthService.resetPassword, payload);
    console.log("Call_Saga_Get_Reset_Password_Response", response.data);

    if (response?.data?.status === "success") {
      yield put(resetPasswordSucess(response.data));
      toast.success("Password updated successfully");
    }
  } catch (error) {
    yield put(resetPasswordError(getError(error)));
    toast.error(getError(error));
  }
}

function* onEmailVerificationStartAsync({ payload }) {
  try {
    console.log("Call_Saga_Get_Email_Verification_Payload", payload);
    const response = yield call(AuthService.emailVerification, payload);
    console.log("Call_Saga_Get_Email_Verification_Response", response);
    if (response?.data?.status === "success") {
      const { user, token } = response.data;

      saveToken(token);
      saveUserInfo(user);
      yield put(emailVerificationSucess(response.data));
    }
  } catch (error) {
    yield put(emailVerificationError(getError(error)));
    // toast.error(getError(error));
  }
}

function* onLoadProfileStartAsync() {
  try {
    const response = yield call(AuthService.getProfile);
    console.log("Call_Saga_Get_Load_Profile_Response", response);
    if (response?.data?.status === "success") {
      saveUserInfo(response?.data?.user);
      yield put(loadProfileSucess(response.data));
    }
  } catch (error) {
    yield put(loadProfileError(getError(error)));
    toast.error(getError(error));
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

export function* onForgetPasswordStart() {
  yield takeLatest(FORGET_PASSWORD_START, onForgetPasswordStartAsync);
}

export function* onResetPasswordStart() {
  yield takeLatest(RESET_PASSWORD_START, onResetPasswordStartAsync);
}

export function* onEmailVerificationStart() {
  yield takeEvery(EMAIL_VERIFICATION_START, onEmailVerificationStartAsync);
}

export function* onLoadProfileStart() {
  yield takeLatest(LOAD_PROFILE_START, onLoadProfileStartAsync);
}

const authSagas = [
  fork(onSignInStart),
  fork(onSignUpStart),
  fork(onUpdateProfileStart),
  fork(onSignOutStart),
  fork(onForgetPasswordStart),
  fork(onResetPasswordStart),
  fork(onEmailVerificationStart),
  fork(onLoadProfileStart),
];

export default function* authSaga() {
  yield all([...authSagas]);
}

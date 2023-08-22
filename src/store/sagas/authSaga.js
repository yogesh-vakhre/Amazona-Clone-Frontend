import { takeLatest, put, all, fork, call } from "redux-saga/effects";
import { SIGN_IN_START } from "../action-types/authActionTypes";
import { signInError, signInSucess } from "../actions/authActions";
import AuthService from "../services/auth.service";
import { saveToken, saveUserInfo } from "../localStorage";

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

export function* onSignInStart() {
  yield takeLatest(SIGN_IN_START, onSignInStartAsync);
}

const authSagas = [fork(onSignInStart)];

export default function* authSaga() {
  yield all([...authSagas]);
}

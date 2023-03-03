import {call, put, takeLatest} from 'redux-saga/effects';
import {requestOTP, verifyOTP} from '../modules/auth/actions';
import http from 'src/utils/http';
import {ActionType} from 'typesafe-actions';
import {AxiosResponse} from 'axios';

function* handleRequestOTP({payload}: ActionType<typeof requestOTP.request>) {
  try {
    const response: AxiosResponse = yield call(http.post, '/auth', payload);
    yield put(requestOTP.success(response.data));
  } catch (error) {
    yield put(requestOTP.failure(error));
  }
}

function* handleVerifyOTP({payload}: ActionType<typeof verifyOTP.request>) {
  try {
    const response: {token: string} = yield call(
      http.post,
      '/auth/code',
      payload,
    );
    yield put(verifyOTP.success(response.token));
  } catch (error) {
    yield put(verifyOTP.failure(error));
  }
}

export default function* authSaga() {
  yield takeLatest(requestOTP.request, handleRequestOTP);
  yield takeLatest(verifyOTP.request, handleVerifyOTP);
}

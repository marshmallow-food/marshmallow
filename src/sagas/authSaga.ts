import {call, put, takeLatest} from 'redux-saga/effects';
import {requestOTP} from '../modules/auth/actions';
import http from 'src/utils/http';
import {ActionType} from 'typesafe-actions';

function* handleRequestOTP({
  payload,
}: ActionType<typeof requestOTP.request>): Generator {
  try {
    const response = yield call(http.post, '/auth', payload);
    //TODO: Надо пофиксить ответы на бэке
    yield put(requestOTP.success(response.data));
  } catch (error) {
    yield put(requestOTP.failure(error));
  }
}

export default function* rootSaga() {
  yield takeLatest(requestOTP.request, handleRequestOTP);
}

import {all, fork} from 'redux-saga/effects';
import AuthSaga from './authSaga';

export default function* rootSaga() {
  yield all([fork(AuthSaga)]);
}

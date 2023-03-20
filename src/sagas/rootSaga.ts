import {all, fork} from 'redux-saga/effects';
import AuthSaga from './authSaga';
import CategorySaga from './categorySaga';

export default function* rootSaga() {
  yield all([fork(AuthSaga), fork(CategorySaga)]);
}

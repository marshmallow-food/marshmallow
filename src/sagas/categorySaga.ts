import {AxiosResponse} from 'axios';
import {call, put, takeLatest} from 'redux-saga/effects';
import http from 'src/utils/http';
import {requestCategories} from 'src/modules/category/actions';
import {ICategory} from 'src/modules/category/types';

function* handleFetchCategories() {
  try {
    const response: AxiosResponse<ICategory[]> = yield call(
      http.get,
      '/categories',
    );
    yield put(requestCategories.success(response.data));
  } catch (error) {
    yield put(requestCategories.failure(error));
  }
}

function* categorySaga() {
  yield takeLatest(requestCategories.request, handleFetchCategories);
}

export default categorySaga;

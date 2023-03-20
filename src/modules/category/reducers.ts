import {createReducer} from 'typesafe-actions';
import {CategoryAction} from 'src/types/actions';
import {requestCategories} from './actions';
import {ICategory} from 'src/modules/category/types';

export interface ICategoryState {
  data: ICategory[];
  errors?: string;
  loading: boolean;
}

export const initialState: ICategoryState = {
  data: [],
  errors: undefined,
  loading: false,
};

export const categoryReducer = createReducer<ICategoryState, CategoryAction>(
  initialState,
)
  .handleAction(requestCategories.request, (state) => ({
    ...state,
    loading: true,
  }))
  .handleAction(requestCategories.success, (state, action) => ({
    ...state,
    loading: false,
    data: action.payload,
  }))
  .handleAction(requestCategories.failure, (state, action) => ({
    ...state,
    loading: false,
    error: action.payload.message,
  }));

export default categoryReducer;

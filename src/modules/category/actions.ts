import {createAsyncAction} from 'typesafe-actions';
import {ICategory} from 'src/modules/category/types';

export const requestCategories = createAsyncAction(
  'CATEGORY/FETCH_CATEGORIES_REQUEST',
  'CATEGORY/FETCH_CATEGORIES_SUCCESS',
  'CATEGORY/FETCH_CATEGORIES_ERROR',
)<void, ICategory[], Error>();

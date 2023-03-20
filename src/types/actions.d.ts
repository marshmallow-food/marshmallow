import {ActionType} from 'typesafe-actions';
import * as appActions from '../modules/app/actions';
import * as authActions from '../modules/auth/actions';
import * as categoryActions from '../modules/category/actions';

export type AppAction = ActionType<typeof appActions>;

export type AuthAction = ActionType<typeof authActions>;

export type CategoryAction = ActionType<typeof categoryActions>;

export type RootAction = AppAction | AuthAction | CategoryAction;

import {ActionType} from 'typesafe-actions';
import * as appActions from '../modules/app/actions';
import * as authActions from '../modules/auth/actions';

export type AppAction = ActionType<typeof appActions>;

export type AuthAction = ActionType<typeof authActions>;

import {createReducer} from 'typesafe-actions';
import {AuthAction} from 'src/types/actions';
import {requestOTP, verifyOTP} from './actions';

export interface AuthState {
  isLoggedIn: boolean;
  authToken: string | null;
}

const initialState: AuthState = {
  isLoggedIn: false,
  authToken: null,
};

export const authReducer = createReducer<AuthState, AuthAction>(initialState)
  .handleAction(requestOTP.success, (state) => ({
    ...state,
    isLoggedIn: false,
  }))
  .handleAction(verifyOTP.success, (state, action) => ({
    ...state,
    isLoggedIn: true,
    authToken: action.payload,
  }));

export default authReducer;

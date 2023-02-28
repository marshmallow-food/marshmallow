import {createReducer} from 'typesafe-actions';
import {AuthAction} from 'src/types/actions';
import {requestOTP, verifyOTP} from './actions';

export interface AuthState {
  isLoggedIn: boolean;
  authToken: string | null;
  phone: string | null;
  error: string | null;
  loading: boolean;
}

const initialState: AuthState = {
  isLoggedIn: false,
  authToken: null,
  phone: null,
  error: null,
  loading: false,
};

export const authReducer = createReducer<AuthState, AuthAction>(initialState)
  .handleAction(requestOTP.request, (state, action) => ({
    ...state,
    isLoggedIn: false,
    loading: true,
    error: null,
    phone: action.payload.phone,
  }))
  .handleAction(requestOTP.success, (state) => ({
    ...state,
    loading: false,
  }))
  .handleAction(requestOTP.failure, (state, action) => ({
    ...state,
    loading: false,
    error: action.payload.message,
  }))
  .handleAction(verifyOTP.request, (state) => ({
    ...state,
    loading: true,
    error: null,
  }))
  .handleAction(verifyOTP.success, (state) => ({
    ...state,
    loading: false,
  }))
  .handleAction(verifyOTP.failure, (state, action) => ({
    ...state,
    loading: false,
    error: action.payload.message,
  }));

export default authReducer;

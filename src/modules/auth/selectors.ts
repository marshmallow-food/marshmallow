import {RootState} from 'src/store';

export const phoneSelector = (state: RootState) => state.auth.phone;

export const isAuthSelector = (state: RootState) => state.auth.isLoggedIn;

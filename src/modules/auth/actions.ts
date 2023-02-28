import {createAsyncAction} from 'typesafe-actions';
import {AxiosError} from 'axios';

export const requestOTP = createAsyncAction(
  'AUTH/REQUEST_OTP_REQUEST',
  'AUTH/REQUEST_OTP_SUCCESS',
  'AUTH/REQUEST_OTP_FAILURE',
)<{phone: string}, void, AxiosError>();

export const verifyOTP = createAsyncAction(
  'AUTH/VERIFY_OTP_REQUEST',
  'AUTH/VERIFY_OTP_SUCCESS',
  'AUTH/VERIFY_OTP_FAILURE',
)<{phone: string; otp: string}, void, AxiosError>();

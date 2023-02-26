import {createAsyncAction} from 'typesafe-actions';

interface RequestOTPPayload {
  phone: string;
}

export const requestOTP = createAsyncAction(
  'AUTH/REQUEST_OTP_REQUEST',
  'AUTH/REQUEST_OTP_SUCCESS',
  'AUTH/REQUEST_OTP_FAILURE',
)<RequestOTPPayload, void, Error>();

export const verifyOTP = createAsyncAction(
  'AUTH/VERIFY_OTP_REQUEST',
  'AUTH/VERIFY_OTP_SUCCESS',
  'AUTH/VERIFY_OTP_FAILURE',
)<{phone: string; otp: string}, string, Error>();

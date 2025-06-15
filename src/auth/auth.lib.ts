import { AdminDocument } from 'src/admin/schema/admin.schema';
import { OTPConstant } from 'src/lib/constants';

export const generateOTP = (length = 5): string => {
  return Math.round(Math.random() * Math.pow(10, length))
    .toString()
    .padStart(length, '0');
};

/** Generate random set of digits of given numeral length */

export const checkOTPValidity = (
  otp: string,
  admin: AdminDocument,
): boolean => {
  return (
    admin.otp === otp &&
    Date.now() - admin.otpTimestamp <= OTPConstant.LIFE_SPAN
  );
};

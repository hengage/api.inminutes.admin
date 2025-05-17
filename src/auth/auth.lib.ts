import * as speakeasy from 'speakeasy';
import { AdminDocument } from 'src/admin/schema/admin.schema';
import { OTPConstant } from 'src/lib/constants';

export const generateOTP = (): { otp: string; secret: string } => {
  const secret = speakeasy.generateSecret({ length: 20 });

  const otp = speakeasy.totp({
    secret: secret.base32,
    encoding: 'base32',
    digits: 5,
    step: 3600,
  });

  return { otp:otp, secret: secret.base32 };
};

export const checkOTPValidity = (
  otp: string,
  admin: AdminDocument,
): boolean => {
  return (
    admin.otp === otp &&
    Date.now() - admin.otpTimestamp <= OTPConstant.LIFE_SPAN
  );
};

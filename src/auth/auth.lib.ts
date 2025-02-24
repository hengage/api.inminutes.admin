import * as speakeasy from 'speakeasy';

export const generateOTP = (): { otp: number; secret: string } => {
  const secret = speakeasy.generateSecret({ length: 20 });

  const otp = speakeasy.totp({
    secret: secret.base32,
    encoding: 'base32',
    digits: 5,
    step: 3600,
  });

  return { otp: parseInt(otp, 10), secret: secret.base32 };
};

export const verifyOTP = (otp: string, secret: string): boolean => {
  return speakeasy.totp.verify({
    secret,
    encoding: 'base32',
    token: otp,
    step: 3600,
    window: 2,
  });
};

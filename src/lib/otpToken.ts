import speakeasy from 'speakeasy';

export const generateOTP = (): {otp: number, secret: string} => {
  const secret = speakeasy.generateSecret({ length: 20 });

  const otp = speakeasy.totp({
    secret: secret.base32,
    encoding: 'base32',
    digits: 5,
    step: 1800,
  });

  return { otp: parseInt(otp, 10), secret: secret.base32 };
};

export const verifyOTP = (otp: number, secret: string): boolean => {
  return speakeasy.totp.verify({
    secret,
    encoding: 'base32',
    token: otp.toString(),
    step: 3600,
    window: 1,
  });
};

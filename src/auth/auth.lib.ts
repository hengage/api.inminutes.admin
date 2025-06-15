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

export function generateRandomPassword(length: number = 12): string {
  const characters =
    'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()_+=-`~[]{}|;\':",./<>?';
  let password = '';

  const requirements = [
    /[a-z]/,
    /[A-Z]/,
    /[0-9]/,
    /[!@#$%^&*()_+\-=`~[\]{}\\|;':",./<>?]/,
  ];

  for (const regex of requirements) {
    let char;
    do {
      char = characters[Math.floor(Math.random() * characters.length)];
    } while (!regex.test(char)); // Keep trying until we have a match
    password += char;
  }

  const remainingLength = length - requirements.length;
  for (let i = 0; i < remainingLength; i++) {
    password += characters[Math.floor(Math.random() * characters.length)];
  }

  password = password
    .split('')
    .sort(() => Math.random() - 0.5)
    .join('');
  return password;
}

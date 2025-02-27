export const ALLOWED_ORIGINS = ['http://localhost:3000'];

export enum AdminRole {
  ADMIN = 'admin',
  SUPERADMIN = 'superadmin',
}

export const JwtConstant = {
  secret: 'JWT_SECRET',
  expiresIn: '1h',
};

export const OTPConstant = {
  LIFE_SPAN: 60 * 60 * 1000, // 1 hour
  RESET_OTP: null,
  RESET_TIMESTAMP: 0,
  OTP_LENGTH: 5,
};

export enum VendorAccountStatus {
  Active = 'active',
  InActive = 'inactive',
}

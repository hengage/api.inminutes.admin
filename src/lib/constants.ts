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
 expiresAt: new Date(Date.now() + 5 * 60 * 1000),
}

export enum VendorAccountStatus {
  Active = 'active',
  InActive = 'inactive',
}



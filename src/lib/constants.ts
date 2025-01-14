export const ALLOWED_ORIGINS = ['http://localhost:3000'];

export enum AdminRole {
  ADMIN = 'admin',
  SUPERADMIN = 'superadmin',
}

export const JwtConstant = {
  secret: 'JWT_SECRET',
  expiresIn: '1h',
};

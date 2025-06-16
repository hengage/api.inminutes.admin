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
  LIFE_SPAN: 24 * 60 * 60 * 1000, // 24 hours
  RESET_OTP: null,
  RESET_TIMESTAMP: 0,
  OTP_LENGTH: 5,
};

export enum VendorAccountStatus {
  Active = 'active',
  InActive = 'inactive',
}

export enum ORDER_TYPE {
  INSTANT = 'instant',
  SCHEDULED = 'scheduled',
}

export enum SORT_ORDER {
  ASC = 'asc',
  DESC = 'desc',
}

export enum TRANSACTION_STATUS {
  ONGOING = 'ongoing',
  PENDING = 'pending',
  APPROVED = 'approved',
  SUCCESS = 'success',
  PROCESSING = 'processing',
  FAILED = 'failed',
  REVERSED = 'reversed',
  ABANDONED = 'abandoned',
}

export enum TRANSACTION_TYPE {
  CREDIT = 'credit',
  DEBIT = 'debit',
}

export enum ERRAND_STATUS {
  PENDING = 'pending',
  RIDER_ASSIGNED = 'rider assigned',
  PICKED_UP = 'picked up',
  IN_TRANSIT = 'in transit',
  NEARBY = 'nearby',
  ARRIVED_DELIVERY_LOCATION = 'arrived delivery location',
  DELIVERED = 'delivered',
  CANCELLED = 'cancelled',
}

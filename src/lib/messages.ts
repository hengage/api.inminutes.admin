export const Msgs = {
  ADMIN_ALREADY_EXISTS(email: string) {
    return `Admin with email '${email.toLowerCase()}' already exists`;
  },
  ADMIN_NOT_FOUND(email: string) {
    return `Admin with email '${email.toLowerCase()}' does not exist`;
  },
  ERROR_INTERNAL_SERVER_ERROR: 'Internal server error. Please try again later.',
};

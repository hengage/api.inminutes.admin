export const Msgs = {
  ADMIN_ALREADY_EXISTS(email: string) {
    return `Admin with email '${email.toLowerCase()}' already exists`;
  },
  ADMIN_NOT_FOUND(email: string) {
    return `Admin with email '${email.toLowerCase()}' does not exist`;
  },
};

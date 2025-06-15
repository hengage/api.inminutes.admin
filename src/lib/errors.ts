/**
 * Extracts the most meaningful error message from an API error response
 * @param error The error object from a caught exception
 * @returns The extracted error message
 */
export function extractErrorMessage(error: any): string {
  return (
    error.response?.data?.message ||
    error.response?.data?.error?.message ||
    error.message ||
    'An unexpected error occurred'
  );
}

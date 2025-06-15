import {
  BadRequestException,
  ForbiddenException,
  HttpException,
  InternalServerErrorException,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';

/**
 * Throws an appropriate NestJS exception based on the error status code
 * @param error The error object from a caught exception
 */
export function throwHttpException(error: any): never {
  const errorMessage = extractErrorMessage(error);
  const statusCode = error.response?.status || 400;
  console.log({ errorMessage, statusCode });

  const exceptionMap: Record<number, new (message: string) => HttpException> = {
    401: UnauthorizedException,
    403: ForbiddenException,
    404: NotFoundException,
    500: InternalServerErrorException,
    502: InternalServerErrorException,
    503: InternalServerErrorException,
    504: InternalServerErrorException,
  };

  const ExceptionClass = exceptionMap[statusCode] || BadRequestException;
  throw new ExceptionClass(errorMessage);
}

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

import { PartialType } from '@nestjs/mapped-types';
import {
  IsEmail,
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';
import { AdminRole } from 'src/lib/constants';

export class OtpConfirmDto {
  @MinLength(2)
  @MaxLength(50)
  @IsNumber()
  @IsNotEmpty()
  otp: number;
}

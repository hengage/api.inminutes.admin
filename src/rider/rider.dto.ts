import { PartialType } from '@nestjs/mapped-types';
import {
  IsArray,
  IsDateString,
  IsEmail,
  IsEnum,
  IsNotEmpty,
  IsOptional,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';
import { AdminRole } from 'src/lib/constants';

export class CreateRiderDto {
  @MinLength(2)
  @MaxLength(50)
  @IsString()
  @IsNotEmpty()
  fullName: string;

  @MinLength(2)
  @MaxLength(50)
  @IsString()
  @IsNotEmpty()
  displayName: string;

  @MinLength(2)
  @MaxLength(50)
  @IsString()
  @IsNotEmpty()
  businessLogo: string;

  @MinLength(2)
  @MaxLength(50)
  @IsString()
  //   @IsNotEmpty()
  businessAddress: string;

  @MinLength(2)
  @MaxLength(50)
  @IsString()
  @IsNotEmpty()
  residentialAddress: string;

  @MinLength(2)
  @MaxLength(50)
  @IsDateString()
  @IsNotEmpty()
  dateOfBirth: string;

  @MinLength(2)
  @MaxLength(50)
  @IsString()
  @IsNotEmpty()
  phoneNumber: string;

  @IsEmail()
  @IsNotEmpty()
  email: string;
}

export class UpdateRiderDto extends PartialType(CreateRiderDto) {}

import { PartialType } from '@nestjs/mapped-types';
import {
  IsEmail,
  IsEnum,
  IsNotEmpty,
  IsOptional,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';
import { AdminRole } from 'src/lib/constants';

export class CreateAdminDto {
  @MinLength(2)
  @MaxLength(50)
  @IsString()
  @IsNotEmpty()
  firstName: string;

  @MinLength(2)
  @MaxLength(50)
  @IsString()
  @IsNotEmpty()
  lastName: string;

  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsEnum(AdminRole)
  @IsOptional()
  role: AdminRole;
}

export class UpdateAdminDto extends PartialType(CreateAdminDto) {}

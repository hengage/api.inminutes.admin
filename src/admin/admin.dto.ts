import { PartialType } from '@nestjs/mapped-types';
import {
  IsEmail,
  IsEnum,
  IsNotEmpty,
  IsOptional,
  IsString,
} from 'class-validator';
import { AdminRole } from 'src/lib/constants';

export class CreateAdminDto {
  @IsString()
  @IsNotEmpty()
  firstName: string;

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

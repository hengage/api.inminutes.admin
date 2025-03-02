import { PartialType } from '@nestjs/mapped-types';
import {
  IsArray,
  IsDateString,
  IsEmail,
  IsEnum,
  IsNotEmpty,
  IsOptional,
  IsString,
  IsInt, 
  Min, 
  MaxLength,
  MinLength,
  IsBoolean,
} from 'class-validator';
import { Transform, Type } from 'class-transformer';
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

export class GetRidersQueryDto {
  @IsOptional()
  @Type(() => Number)
  @IsInt()
  page?: number = 1;

  @IsOptional()
  @Type(() => Number)
  @IsInt()
  limit?: number = 10;

  @IsOptional()
  @IsString()
  searchQuery?: string;

  @IsOptional()
  @IsString()
  vehicleType?: string;

  @IsOptional()
  @Type(() => Boolean)
  @IsBoolean()
  currentlyWorking?: boolean;

  @IsOptional()
  @IsString()
  accountStatus?: string;
}

export class GetDeliveriesQueryDto {
  @IsOptional()
  @Type(() => Number)
  @IsInt()
  page?: number = 1;

  @IsOptional()
  @Type(() => Number)
  @IsInt()
  limit?: number = 10;

  @IsOptional()
  @IsString()
  search?: string;

  @IsOptional()
  @IsString()
  status?: string;
}

export class GetWorkAreasQueryDto {
  @IsOptional()
  @Type(() => Number)
  @IsInt()
  page?: number = 1;

  @IsOptional()
  @Type(() => Number)
  @IsInt()
  limit?: number = 10;
}

export class GetWorkAreaSessionQueryDto extends GetWorkAreasQueryDto {
  @IsOptional()
  @Type(() => Date)
  startDate?: Date;
  
  @IsOptional()
  @Type(() => Date)
  endDate?: Date;
}

export class RiderParamDto {
  @IsString()
  riderId: string;
}

export class WorkAreaParamDto {
  @IsString()
  workAreaId: string;
}

export class SessionParamDto extends WorkAreaParamDto {
  @IsString()
  sessionId: string;
}

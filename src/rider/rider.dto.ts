import { PartialType } from '@nestjs/mapped-types';
import { Type } from 'class-transformer';
import {
  IsArray,
  IsBoolean,
  IsDateString,
  IsEmail,
  IsInt,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';

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

  // @MinLength(2)
  // @MaxLength(50)
  // @IsString()
  // @IsNotEmpty()
  // businessLogo: string;

  // @MinLength(2)
  // @MaxLength(50)
  // @IsString()
  // //   @IsNotEmpty()
  // businessAddress: string;

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

export class GetWorkAreasQueryDto {
  @IsOptional()
  @Type(() => Number)
  @IsInt()
  page?: number = 1;

  @IsOptional()
  @Type(() => Number)
  @IsInt()
  limit?: number = 10;

  @IsDateString()
  @IsOptional()
  date?: Date;
}

export class GetRidersQueryDto extends GetWorkAreasQueryDto {
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

export class GetDeliveriesQueryDto extends GetWorkAreasQueryDto {
  @IsOptional()
  @IsString()
  search?: string;

  @IsOptional()
  @IsString()
  status?: string;
}

export class AddWorkAreaDto {
  @IsString()
  name: string;

  @IsArray()
  coordinates: GeoCoordinates;

  @IsNumber()
  maxSlotsRequired: number;
}
export class GetTimeSlotQueryDto extends GetDeliveriesQueryDto {
  @IsOptional()
  @IsString()
  startTime?: string;

  @IsOptional()
  @IsString()
  endTime?: string;
}

export class CreateTimeSlotDto {
  @IsOptional()
  @IsString()
  startTime?: string;

  @IsOptional()
  @IsString()
  endTime?: string;

  @IsOptional()
  @IsString()
  status?: string;
}

export class GetNearbyRidersQueryDto {
  @IsNotEmpty()
  @IsNumber()
  @Type(() => Number)
  lng: number;

  @IsNotEmpty()
  @IsNumber()
  @Type(() => Number)
  lat: number;

  @IsOptional()
  @IsNumber()
  @Type(() => Number)
  distanceInKM?: number = 5; // Default 5km
}

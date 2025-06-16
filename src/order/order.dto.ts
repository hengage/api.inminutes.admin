import { Transform, Type } from 'class-transformer';
import {
  IsOptional,
  IsString,
  IsNumber,
  IsBoolean,
  IsEnum,
  IsNotEmpty,
} from 'class-validator';
import { ORDER_TYPE, SORT_ORDER } from 'src/lib';

export class GetOrdersQueryDto {
  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  page?: number;

  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  limit?: number;

  @IsOptional()
  @IsString()
  searchQuery?: string;

  @IsOptional()
  @IsString()
  fromDate?: string;

  @IsOptional()
  @IsString()
  toDate?: string;

  @IsOptional()
  @IsString()
  customer?: string;

  @IsOptional()
  @IsString()
  status?: string;

  @IsOptional()
  @IsString()
  rider?: string;

  @IsOptional()
  @IsString()
  vendor?: string;

  @IsOptional()
  @IsEnum(ORDER_TYPE)
  type?: ORDER_TYPE;

  @IsOptional()
  @IsEnum(SORT_ORDER)
  sortOrder?: SORT_ORDER;

  @IsOptional()
  @Transform(({ value }) => value === 'true' || value === true)
  @IsBoolean()
  onlyOngoing?: boolean;
}

export class AssignRiderDto {
  @IsNotEmpty()
  @IsString()
  riderId: string;
}

export class UpdateOrderStatusDto {
  @IsNotEmpty()
  @IsString()
  status: string;
}
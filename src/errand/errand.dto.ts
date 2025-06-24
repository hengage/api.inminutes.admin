import { Transform, Type } from 'class-transformer';
import {
  IsDate,
  IsNumber,
  IsOptional,
  IsString,
  IsBoolean,
  IsNotEmpty,
} from 'class-validator';
import { ORDER_TYPE } from 'src/lib';
import { ERRAND_STATUS } from 'src/lib/constants';

export class GetErrandsQueryDto {
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
  @Type(() => Date)
  @IsDate()
  startDate?: Date;

  @IsOptional()
  @Type(() => Date)
  @IsDate()
  endDate?: Date;

  @IsOptional()
  @IsString()
  type?: ORDER_TYPE; // uae Oder type enum as they have same values

  @IsOptional()
  @IsString()
  rider: string;

  @IsOptional()
  @IsString()
  customer?: string;

  @IsOptional()
  @IsString()
  status?: ERRAND_STATUS;

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

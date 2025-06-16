import { Type } from 'class-transformer';
import { IsDate, IsNumber, IsOptional, IsString } from 'class-validator';
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
  status?: ERRAND_STATUS;
}

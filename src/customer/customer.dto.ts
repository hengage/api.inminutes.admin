import { IsOptional, IsNumber, IsString, IsDateString, Min } from 'class-validator';
import { Type } from 'class-transformer';

export class UpdateCustomerDto {}

export class GetCustomersPaginationDto {
  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  @Min(1)
  page?: number = 1;

  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  @Min(1)
  limit?: number = 10;
}
export class GetCustomersQueryDto extends GetCustomersPaginationDto{
  @IsOptional()
  @IsString()
  search?: string;

  @IsOptional()
  @IsDateString()
  fromDateJoined?: string;

  @IsOptional()
  @IsDateString()
  toDateJoined?: string;

  @IsOptional()
  @IsString()
  status?: string;
}

export class GetCustomerOrdersQueryDto extends GetCustomersPaginationDto{
  @IsOptional()
  @IsString()
  search?: string;

  @IsOptional()
  @IsDateString()
  startDate?: string;

  @IsOptional()
  @IsDateString()
  endDate?: string;

  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  minPrice?: number;

  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  maxPrice?: number;

  @IsOptional()
  @IsString()
  status?: string;
}

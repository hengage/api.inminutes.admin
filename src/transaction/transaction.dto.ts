import { Type } from 'class-transformer';
import { IsOptional, IsString, IsNumber, IsDate } from 'class-validator';
import { TRANSACTION_STATUS, TRANSACTION_TYPE } from 'src/lib/constants';

export class GetTransactionsQueryDto {
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
  search?: string;

  @IsOptional()
  @IsString()
  reason?: string;

  @IsOptional()
  @Type(() => Date)
  @IsDate()
  fromDate?: Date;

  @IsOptional()
  @Type(() => Date)
  @IsDate()
  toDate?: Date;

  @IsOptional()
  @IsString()
  status?: TRANSACTION_STATUS;

  @IsOptional()
  @IsString()
  type?: TRANSACTION_TYPE;

  @IsOptional()
  @IsString()
  lowestAmount?: string;

  @IsOptional()
  @IsString()
  highestAmount?: string;
}

import { PartialType } from '@nestjs/mapped-types';
import {
  IsArray,
  IsEmail,
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';
import { AdminRole } from 'src/lib/constants';

export class CreateProductDto {
  @MinLength(2)
  @MaxLength(50)
  @IsString()
  @IsNotEmpty()
  name: string;

  @MinLength(2)
  @MaxLength(50)
  @IsString()
  @IsNotEmpty()
  image: string;

  @MinLength(2)
  @MaxLength(50)
  @IsString()
  @IsNotEmpty()
  description: string;

  @MinLength(2)
  @MaxLength(50)
  @IsString()
  @IsNotEmpty()
  cost: string;

  @MinLength(2)
  @MaxLength(50)
  @IsString()
  @IsNotEmpty()
  category: string;

  @MinLength(2)
  @MaxLength(50)
  @IsString()
  subCategory: string;

  @IsArray()
  addOns: {}[];

  @IsArray()
  tags: string[];

  @IsNumber()
  @IsNotEmpty()
  quantity: number;
}

export class UpdateProductDto extends PartialType(CreateProductDto) {}
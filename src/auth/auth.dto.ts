import { IsNotEmpty, IsNumber } from 'class-validator';

export class OtpConfirmDto {
  @IsNumber()
  @IsNotEmpty()
  otp: number;
}

import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class OtpConfirmDto {
  @IsString()
  @IsNotEmpty()
  otp: string;

  @IsEmail()
  @IsNotEmpty()
  email: string;
}

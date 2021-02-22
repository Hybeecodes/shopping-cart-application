import { IsDefined, IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class LoginRequestDto {
  @IsDefined()
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsDefined()
  @IsNotEmpty()
  @IsString()
  password: string;
}

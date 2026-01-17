import { IsEmail, IsNotEmpty, IsString, MinLength } from 'class-validator';

export class LoginDTO {
  @IsNotEmpty({ message: 'email not empty' })
  @IsString({ message: 'email must be string' })
  @IsEmail()
  email: string;

  @IsNotEmpty({ message: 'password not empty' })
  @IsString({ message: 'password must be string' })
  @MinLength(8, { message: 'Min Length of password is 8' })
  password: string;
}

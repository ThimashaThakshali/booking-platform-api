import { IsEmail, MinLength } from 'class-validator';

// Data expected when logging in
export class LoginDto {
  @IsEmail()
  email!: string;

  @MinLength(6)
  password!: string;
}

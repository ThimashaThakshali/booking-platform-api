import { IsEmail, IsNotEmpty, MinLength } from 'class-validator';

// Data expected when registering a new user
export class RegisterDto {
  @IsNotEmpty()
  fullName!: string;

  @IsEmail()
  email!: string;

  @MinLength(6)
  password!: string;
}

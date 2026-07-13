import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, MinLength } from 'class-validator';

// Data expected when registering a new user
export class RegisterDto {
  @ApiProperty({
    example: 'Thimasha Thakshali',
    description: 'Full name of the user',
  })
  @IsNotEmpty()
  fullName!: string;

  @ApiProperty({
    example: 'thimasha@test.com',
    description: 'Unique email address',
  })
  @IsEmail()
  email!: string;

  @ApiProperty({
    example: 'Password123',
    description: 'Password (minimum 6 characters)',
    minLength: 6,
  })
  @MinLength(6)
  password!: string;
}

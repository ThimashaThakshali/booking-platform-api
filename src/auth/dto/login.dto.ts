import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, MinLength } from 'class-validator';

// Data expected when logging in
export class LoginDto {
  @ApiProperty({
    example: 'thimasha@test.com',
    description: 'Registered email address',
  })
  @IsEmail()
  email!: string;

  @ApiProperty({
    example: 'Password123',
    description: 'User password',
    minLength: 6,
  })
  @MinLength(6)
  password!: string;
}

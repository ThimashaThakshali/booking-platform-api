import { BadRequestException, Injectable } from '@nestjs/common';

import * as bcrypt from 'bcrypt';

import { UsersService } from '../users/users.service';
import { RegisterDto } from './dto/register.dto';

// Business logic for authentication
@Injectable()
export class AuthService {
  constructor(private readonly usersService: UsersService) {}

  // Register a new user
  async register(registerDto: RegisterDto) {
    // Check if email already exists
    const existingUser = await this.usersService.findByEmail(registerDto.email);

    if (existingUser) {
      throw new BadRequestException('Email already exists');
    }

    // Hash the password before saving
    const hashedPassword = await bcrypt.hash(registerDto.password, 10);

    const user = await this.usersService.create({
      fullName: registerDto.fullName,
      email: registerDto.email,
      password: hashedPassword,
    });

    return {
      message: 'User registered successfully',
      id: user.id,
      email: user.email,
    };
  }
}

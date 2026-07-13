import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { User } from './user.entity';

// Business logic for users
@Injectable()
export class UsersService {
  constructor(
    // Connect to the Users table
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  // Find a user using the email address
  async findByEmail(email: string): Promise<User | null> {
    return this.userRepository.findOne({
      where: { email },
    });
  }

  // Save a new user
  async create(user: Partial<User>): Promise<User> {
    return this.userRepository.save(user);
  }
}

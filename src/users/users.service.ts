import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity';

// Business logic for users
@Injectable()
export class UsersService {
  constructor(
    // Connect this service to the Users table
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  // Find a user by email
  async findByEmail(email: string) {
    return this.userRepository.findOne({
      where: { email },
    });
  }

  // Save a new user
  async create(user: Partial<User>) {
    return this.userRepository.save(user);
  }
}

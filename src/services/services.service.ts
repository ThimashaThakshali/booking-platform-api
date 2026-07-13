import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { Repository } from 'typeorm';

import { Service } from './entities/service.entity';
import { CreateServiceDto } from './dto/create-service.dto';
import { UpdateServiceDto } from './dto/update-service.dto';

// Handles service business logic
@Injectable()
export class ServicesService {
  constructor(
    @InjectRepository(Service)
    private readonly serviceRepository: Repository<Service>,
  ) {}

  // Create a service
  create(createServiceDto: CreateServiceDto) {
    return this.serviceRepository.save(createServiceDto);
  }

  // Get all services
  findAll() {
    return this.serviceRepository.find();
  }

  // Get one service
  findOne(id: number) {
    return this.serviceRepository.findOneBy({ id });
  }

  // Update a service
  async update(id: number, updateServiceDto: UpdateServiceDto) {
    await this.serviceRepository.update(id, updateServiceDto);

    return this.findOne(id);
  }

  // Delete a service
  async remove(id: number) {
    await this.serviceRepository.delete(id);

    return {
      message: 'Service deleted successfully',
    };
  }
}

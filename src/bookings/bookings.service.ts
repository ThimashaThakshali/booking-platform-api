import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Booking } from './entities/booking.entity';
import { Service } from '../services/entities/service.entity';

import { CreateBookingDto } from './dto/create-booking.dto';
import { UpdateBookingDto } from './dto/update-booking.dto';

import { BookingStatus } from './enums/booking-status.enum';

// Handles booking business logic
@Injectable()
export class BookingsService {
  constructor(
    @InjectRepository(Booking)
    private readonly bookingRepository: Repository<Booking>,

    @InjectRepository(Service)
    private readonly serviceRepository: Repository<Service>,
  ) {}

  // Create a new booking
  async create(createBookingDto: CreateBookingDto) {
    // Check whether the selected service exists
    const service = await this.serviceRepository.findOneBy({
      id: createBookingDto.serviceId,
    });

    if (!service) {
      throw new NotFoundException('Service not found');
    }

    // Service must be active
    if (!service.isActive) {
      throw new BadRequestException(
        'Bookings cannot be created for inactive services',
      );
    }

    // Booking date cannot be in the past
    const bookingDate = new Date(createBookingDto.bookingDate);
    const today = new Date();

    today.setHours(0, 0, 0, 0);
    bookingDate.setHours(0, 0, 0, 0);

    if (bookingDate < today) {
      throw new BadRequestException('Booking date cannot be in the past');
    }

    // Prevent duplicate bookings
    const existingBooking = await this.bookingRepository.findOne({
      where: {
        service: { id: createBookingDto.serviceId },
        bookingDate: createBookingDto.bookingDate,
        bookingTime: createBookingDto.bookingTime,
      },
      relations: ['service'],
    });

    if (existingBooking) {
      throw new BadRequestException(
        'This service is already booked for the selected date and time',
      );
    }

    // Create booking
    const booking = this.bookingRepository.create({
      customerName: createBookingDto.customerName,
      customerEmail: createBookingDto.customerEmail,
      customerPhone: createBookingDto.customerPhone,
      bookingDate: createBookingDto.bookingDate,
      bookingTime: createBookingDto.bookingTime,
      notes: createBookingDto.notes,
      status: createBookingDto.status ?? BookingStatus.PENDING,
      service,
    });

    return this.bookingRepository.save(booking);
  }

  // Get all bookings
  findAll() {
    return this.bookingRepository.find({
      relations: ['service'],
    });
  }

  // Get booking by ID
  findOne(id: number) {
    return this.bookingRepository.findOne({
      where: { id },
      relations: ['service'],
    });
  }

  // Update booking
  async update(id: number, updateBookingDto: UpdateBookingDto) {
    const booking = await this.findOne(id);

    if (!booking) {
      throw new NotFoundException('Booking not found');
    }

    // Cancelled bookings cannot become completed
    if (
      booking.status === BookingStatus.CANCELLED &&
      updateBookingDto.status === BookingStatus.COMPLETED
    ) {
      throw new BadRequestException('Cancelled bookings cannot be completed');
    }

    Object.assign(booking, updateBookingDto);

    return this.bookingRepository.save(booking);
  }

  // Cancel booking
  async cancel(id: number) {
    const booking = await this.findOne(id);

    if (!booking) {
      throw new NotFoundException('Booking not found');
    }

    booking.status = BookingStatus.CANCELLED;

    return this.bookingRepository.save(booking);
  }
}

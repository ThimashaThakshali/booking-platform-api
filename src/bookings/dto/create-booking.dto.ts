import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsDateString,
  IsEmail,
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  Min,
} from 'class-validator';

import { BookingStatus } from '../enums/booking-status.enum';

// Data needed to create a booking
export class CreateBookingDto {
  @ApiProperty({
    example: 'John Silva',
    description: 'Customer full name',
  })
  @IsString()
  @IsNotEmpty()
  customerName!: string;

  @ApiProperty({
    example: 'john@test.com',
    description: 'Customer email address',
  })
  @IsEmail()
  customerEmail!: string;

  @ApiProperty({
    example: '0771234567',
    description: 'Customer contact number',
  })
  @IsString()
  @IsNotEmpty()
  customerPhone!: string;

  @ApiProperty({
    example: 3,
    description: 'ID of the selected service',
  })
  @IsNumber()
  @Min(1)
  serviceId!: number;

  @ApiProperty({
    example: '2026-07-20',
    description: 'Booking date',
  })
  @IsDateString()
  bookingDate!: string;

  @ApiProperty({
    example: '10:00',
    description: 'Booking time',
  })
  @IsString()
  @IsNotEmpty()
  bookingTime!: string;

  @ApiPropertyOptional({
    enum: BookingStatus,
    example: BookingStatus.PENDING,
    description: 'Booking status',
  })
  @IsOptional()
  @IsEnum(BookingStatus)
  status?: BookingStatus;

  @ApiPropertyOptional({
    example: 'Morning appointment',
    description: 'Additional notes',
  })
  @IsOptional()
  @IsString()
  notes?: string;
}

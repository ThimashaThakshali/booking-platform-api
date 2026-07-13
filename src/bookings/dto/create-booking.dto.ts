import {
  IsDateString,
  IsEmail,
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsPhoneNumber,
  IsString,
  Min,
} from 'class-validator';

import { BookingStatus } from '../enums/booking-status.enum';

// Data needed to create a booking
export class CreateBookingDto {
  @IsString()
  @IsNotEmpty()
  customerName!: string;

  @IsEmail()
  customerEmail!: string;

  @IsString()
  @IsNotEmpty()
  customerPhone!: string;

  @IsNumber()
  @Min(1)
  serviceId!: number;

  @IsDateString()
  bookingDate!: string;

  @IsString()
  @IsNotEmpty()
  bookingTime!: string;

  @IsOptional()
  @IsEnum(BookingStatus)
  status?: BookingStatus;

  @IsOptional()
  @IsString()
  notes?: string;
}

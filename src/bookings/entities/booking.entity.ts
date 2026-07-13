import {
  Column,
  Entity,
  ManyToOne,
  JoinColumn,
  PrimaryGeneratedColumn,
} from 'typeorm';

import { Service } from '../../services/entities/service.entity';
import { BookingStatus } from '../enums/booking-status.enum';

// This class becomes the bookings table
@Entity('bookings')
export class Booking {
  // Auto-generated ID
  @PrimaryGeneratedColumn()
  id!: number;

  // Customer name
  @Column()
  customerName!: string;

  // Customer email
  @Column()
  customerEmail!: string;

  // Customer phone
  @Column()
  customerPhone!: string;

  // Booking date
  @Column('date')
  bookingDate!: string;

  // Booking time
  @Column()
  bookingTime!: string;

  // Extra notes
  @Column({
    nullable: true,
  })
  notes?: string;

  // Current booking status
  @Column({
    type: 'enum',
    enum: BookingStatus,
    default: BookingStatus.PENDING,
  })
  status!: BookingStatus;

  // Related service
  @ManyToOne(() => Service)
  @JoinColumn({
    name: 'serviceId',
  })
  service!: Service;
}

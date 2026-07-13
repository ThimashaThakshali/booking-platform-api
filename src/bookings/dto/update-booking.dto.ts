import { PartialType } from '@nestjs/mapped-types';

import { CreateBookingDto } from './create-booking.dto';

// All fields become optional when updating
export class UpdateBookingDto extends PartialType(CreateBookingDto) {}

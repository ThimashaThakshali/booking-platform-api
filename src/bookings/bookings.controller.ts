import {
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
} from '@nestjs/common';

import { ApiBody, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

import { BookingsService } from './bookings.service';

import { CreateBookingDto } from './dto/create-booking.dto';
import { UpdateBookingDto } from './dto/update-booking.dto';

// Handles booking API requests
@ApiTags('Bookings')
@Controller('bookings')
export class BookingsController {
  constructor(private readonly bookingsService: BookingsService) {}

  @ApiOperation({
    summary: 'Create a booking',
  })
  @ApiBody({ type: CreateBookingDto })
  @ApiResponse({
    status: 201,
    description: 'Booking created successfully.',
  })
  @Post()
  create(@Body() createBookingDto: CreateBookingDto) {
    return this.bookingsService.create(createBookingDto);
  }

  @ApiOperation({
    summary: 'Get all bookings',
  })
  @ApiResponse({
    status: 200,
    description: 'Returns all bookings.',
  })
  @Get()
  findAll() {
    return this.bookingsService.findAll();
  }

  @ApiOperation({
    summary: 'Get booking by ID',
  })
  @ApiResponse({
    status: 200,
    description: 'Returns a booking.',
  })
  @ApiResponse({
    status: 404,
    description: 'Booking not found.',
  })
  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.bookingsService.findOne(id);
  }

  @ApiOperation({
    summary: 'Update booking',
  })
  @ApiBody({ type: UpdateBookingDto })
  @ApiResponse({
    status: 200,
    description: 'Booking updated successfully.',
  })
  @Patch(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateBookingDto: UpdateBookingDto,
  ) {
    return this.bookingsService.update(id, updateBookingDto);
  }

  @ApiOperation({
    summary: 'Cancel booking',
  })
  @ApiResponse({
    status: 200,
    description: 'Booking cancelled successfully.',
  })
  @Patch(':id/cancel')
  cancel(@Param('id', ParseIntPipe) id: number) {
    return this.bookingsService.cancel(id);
  }
}

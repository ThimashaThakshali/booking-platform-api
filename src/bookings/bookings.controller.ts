import {
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Query,
} from '@nestjs/common';

import {
  ApiBody,
  ApiOperation,
  ApiQuery,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';

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
  @ApiQuery({
    name: 'status',
    required: false,
    description: 'Filter by booking status',
  })
  @ApiQuery({
    name: 'search',
    required: false,
    description: 'Search by customer name or email',
  })
  @ApiQuery({
    name: 'page',
    required: false,
    example: 1,
  })
  @ApiQuery({
    name: 'limit',
    required: false,
    example: 10,
  })
  @ApiResponse({
    status: 200,
    description: 'Returns bookings.',
  })
  @Get()
  findAll(
    @Query('status') status?: string,
    @Query('search') search?: string,
    @Query('page') page = '1',
    @Query('limit') limit = '10',
  ) {
    return this.bookingsService.findAll(
      status,
      search,
      Number(page),
      Number(limit),
    );
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

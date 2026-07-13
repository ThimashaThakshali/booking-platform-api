import { ApiProperty } from '@nestjs/swagger';
import {
  IsBoolean,
  IsNotEmpty,
  IsNumber,
  IsPositive,
  IsString,
  Max,
  Min,
} from 'class-validator';

// Data needed to create a service
export class CreateServiceDto {
  @ApiProperty({
    example: 'Website Development',
    description: 'Service title',
  })
  @IsString()
  @IsNotEmpty()
  title!: string;

  @ApiProperty({
    example: 'Professional website development service',
    description: 'Detailed service description',
  })
  @IsString()
  @IsNotEmpty()
  description!: string;

  @ApiProperty({
    example: 120,
    description: 'Duration in minutes',
  })
  @IsNumber()
  @Min(1)
  @Max(1440)
  duration!: number;

  @ApiProperty({
    example: 5000,
    description: 'Price of the service',
  })
  @IsNumber()
  @IsPositive()
  price!: number;

  @ApiProperty({
    example: true,
    description: 'Whether the service is active',
  })
  @IsBoolean()
  isActive!: boolean;
}

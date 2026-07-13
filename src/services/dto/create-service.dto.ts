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
  @IsString()
  @IsNotEmpty()
  title!: string;

  @IsString()
  @IsNotEmpty()
  description!: string;

  @IsNumber()
  @Min(1)
  @Max(1440)
  duration!: number;

  @IsNumber()
  @IsPositive()
  price!: number;

  @IsBoolean()
  isActive!: boolean;
}

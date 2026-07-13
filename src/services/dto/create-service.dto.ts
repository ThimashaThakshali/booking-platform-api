import { IsBoolean, IsNotEmpty, IsNumber, IsString } from 'class-validator';

// Data needed to create a service
export class CreateServiceDto {
  @IsString()
  @IsNotEmpty()
  title!: string;

  @IsString()
  @IsNotEmpty()
  description!: string;

  @IsNumber()
  duration!: number;

  @IsNumber()
  price!: number;

  @IsBoolean()
  isActive!: boolean;
}

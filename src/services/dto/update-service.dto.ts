import { PartialType } from '@nestjs/mapped-types';
import { CreateServiceDto } from './create-service.dto';

// All fields become optional when updating
export class UpdateServiceDto extends PartialType(CreateServiceDto) {}

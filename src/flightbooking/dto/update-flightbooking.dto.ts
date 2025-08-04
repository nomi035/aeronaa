import { PartialType } from '@nestjs/mapped-types';
import { CreateFlightbookingDto } from './create-flightbooking.dto';

export class UpdateFlightbookingDto extends PartialType(CreateFlightbookingDto) {}

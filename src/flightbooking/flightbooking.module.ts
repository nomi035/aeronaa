import { Module } from '@nestjs/common';
import { FlightbookingService } from './flightbooking.service';
import { FlightbookingController } from './flightbooking.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Flight } from 'src/flights/entities/flight.entity';
import { Flightbooking } from './entities/flightbooking.entity';

@Module({
  controllers: [FlightbookingController],
  providers: [FlightbookingService],
  imports:[TypeOrmModule.forFeature([Flightbooking])]
})
export class FlightbookingModule {}

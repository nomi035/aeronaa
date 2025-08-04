import { Module } from '@nestjs/common';
import { FlightsService } from './flights.service';
import { FlightsController } from './flights.controller';
import { Flight } from './entities/flight.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FlightSegment } from './entities/segment.entity';

@Module({
  controllers: [FlightsController],
  providers: [FlightsService],
  imports: [TypeOrmModule.forFeature([Flight,FlightSegment])],
})
export class FlightsModule {}

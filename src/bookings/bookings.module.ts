
import { Module } from '@nestjs/common';
import { BookingsService } from './bookings.service';
import { BookingsController } from './bookings.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Booking } from './entities/booking.entity';
import { UserModule } from 'src/user/user.module';
import { Favourites } from './entities/favourites.entity';

@Module({
  controllers: [BookingsController],
  providers: [BookingsService],
  imports:[TypeOrmModule.forFeature([Booking,Favourites]),UserModule],
})
export class BookingsModule {}

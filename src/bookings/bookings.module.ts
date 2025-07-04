
import { Module } from '@nestjs/common';
import { BookingsService } from './bookings.service';
import { BookingsController } from './bookings.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Booking } from './entities/booking.entity';
import { UserModule } from 'src/user/user.module';
import { Favourites } from './entities/favourites.entity';
import { RoomsModule } from 'src/rooms/rooms.module';
import { StripeModule } from 'src/stripe/stripe.module';

@Module({
  controllers: [BookingsController],
  providers: [BookingsService],
  imports:[TypeOrmModule.forFeature([Booking,Favourites]),UserModule,RoomsModule,StripeModule],
  exports: [BookingsService]
})
export class BookingsModule {}

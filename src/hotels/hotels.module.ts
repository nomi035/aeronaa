import { Module } from '@nestjs/common';
import { HotelsService } from './hotels.service';
import { HotelsController } from './hotels.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Hotel } from './entities/hotel.entity';
import { UserModule } from 'src/user/user.module';
import { BookingsModule } from 'src/bookings/bookings.module';

@Module({
  controllers: [HotelsController],
  providers: [HotelsService],
  imports:[TypeOrmModule.forFeature([Hotel]),UserModule,BookingsModule],
})
export class HotelsModule {}

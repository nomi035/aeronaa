import { Injectable } from '@nestjs/common';
import { CreateBookingDto } from './dto/create-booking.dto';
import { UpdateBookingDto } from './dto/update-booking.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Booking } from './entities/booking.entity';
import { Repository } from 'typeorm';
import { Favourites } from './entities/favourites.entity';

@Injectable()
export class BookingsService {
  constructor(@InjectRepository(Booking) private bookingRepository: Repository<Booking>,
  @InjectRepository(Favourites) private favouritesRepository: Repository<Favourites>
) {

  }
  create(createBookingDto: CreateBookingDto) {
    return this.bookingRepository.save(createBookingDto);
  }

  findAll() {
    return this.bookingRepository.find();
  }

  findHotelBookings(hotelId: number) {
    return this.bookingRepository.find({where: {hotel:{id: hotelId}},relations: ['hotel','user','room']});
  }
   findUserBookings(id: number) {
    return this.bookingRepository.find({where: {user:{id}},relations: ['hotel','user','room']});
  }

  findOne(id: number) {
    return this.bookingRepository.findOne({where: {id: id}});
  }

  update(id: number, updateBookingDto: UpdateBookingDto) {
    return this.bookingRepository.update(id, updateBookingDto);
  }

  remove(id: number) {
    return this.bookingRepository.delete(id);
  }
}

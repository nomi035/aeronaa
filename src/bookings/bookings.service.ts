import { Injectable } from '@nestjs/common';
import { CreateBookingDto } from './dto/create-booking.dto';
import { UpdateBookingDto } from './dto/update-booking.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Booking } from './entities/booking.entity';
import { LessThan, MoreThan, Repository } from 'typeorm';
import { Favourites } from './entities/favourites.entity';
import { CreateFavouriteDto } from './dto/create-favourite.dto';

@Injectable()
export class BookingsService {
  constructor(
    @InjectRepository(Booking) private bookingRepository: Repository<Booking>,
    @InjectRepository(Favourites)
    private favouritesRepository: Repository<Favourites>,
  ) {}
  create(createBookingDto: CreateBookingDto) {
    return this.bookingRepository.save(createBookingDto);
  }

  createFavourite(createFavouriteDto: CreateFavouriteDto) {
    return this.favouritesRepository.save(createFavouriteDto);
  }

  removeFavourite(id: number) {
    return this.favouritesRepository.delete(id);
  }

  findFavourite(userId: number, hotelId: number) {
    return this.favouritesRepository.find({
      where: {
        user: { id: userId },
        hotel: { id: hotelId },
      },
    });
  }

  findUserFavourites(id: number) {
    return this.favouritesRepository.find({
      where: { user: { id } },
      relations: ['hotel'],
      order: {
        createdAt: 'DESC',
      },
    });
  }

  findAll() {
    return this.bookingRepository.find({
      relations: ['hotel', 'user', 'room'],
       order: {
        createdAt: 'DESC',
      },
    });
  }

  findUpComing(id: number) {
    return this.bookingRepository.find({
      where: {
        user: { id: id },
        checkIndate: MoreThan(new Date()),
      },
      relations: ['hotel', 'room'],
      order: {
        createdAt: 'DESC',
      },
    });
  }
  findPast(id: number) {
    return this.bookingRepository.find({
      where: {
        user: { id: id },
        checkIndate: LessThan(new Date()),
      },
      relations: ['hotel', 'room'],
      order: {
        createdAt: 'DESC',
      },
    });
  }

  findCancelled(id: number) {
    return this.bookingRepository.find({
      where: {
        user: { id: id },
        isActive: false,
      },
      relations: ['hotel', 'room'],
      order: {
        createdAt: 'DESC',
      },
    });
  }
  findHotelBookings(hotelId: number) {
    return this.bookingRepository.find({
      where: { hotel: { id: hotelId } },
      relations: ['hotel', 'user', 'room'],
       order: {
        createdAt: 'DESC',
      },
    });
  }
  findUserBookings(id: number) {
    return this.bookingRepository.find({
      where: { user: { id } },
      relations: ['hotel', 'user', 'room'],
    });
  }

  findOne(id: number) {
    return this.bookingRepository.findOne({ where: { id: id } });
  }

  update(id: number, updateBookingDto: UpdateBookingDto) {
    return this.bookingRepository.update(id, updateBookingDto);
  }

  remove(id: number) {
    return this.bookingRepository.delete(id);
  }
}

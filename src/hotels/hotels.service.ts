import { Injectable } from '@nestjs/common';
import { CreateHotelDto } from './dto/create-hotel.dto';
import { UpdateHotelDto } from './dto/update-hotel.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Hotel } from './entities/hotel.entity';

@Injectable()
export class HotelsService {
  constructor(
    @InjectRepository(Hotel)
    private readonly hotelRepository: Repository<Hotel>,
  ) {}
  create(createHotelDto: CreateHotelDto) {
    return this.hotelRepository.save(createHotelDto);
  }

  findAll(id: number) {
    return this.hotelRepository.find({
      where: {
        user:{
          id
        }
      },
    });
  }

  async findAllHotels(){
    return await this.hotelRepository.find()
  }

  async findPendingHotel(id:number){
    return await this.hotelRepository.find({
      where: {
        user:{
          id
        },
        isCompleted:0
      }
    })

  }

    async findCompletedHotel(id:number){
    return await this.hotelRepository.find({
      where: {
        user:{
          id
        },
        isCompleted:1
      }
    })

  }

  findOne(id: number) {
    return this.hotelRepository.findOne({
      where: { id },
    });
  }

  update(id: number, updateHotelDto: UpdateHotelDto) {
    return this.hotelRepository.update(id, updateHotelDto);
  }

  remove(id: number) {
    return this.hotelRepository.delete(id);
  }
}

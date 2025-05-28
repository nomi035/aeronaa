import { Injectable } from '@nestjs/common';
import { CreateRoomDto } from './dto/create-room.dto';
import { UpdateRoomDto } from './dto/update-room.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Room } from './entities/room.entity';
import { In, Repository } from 'typeorm';

@Injectable()
export class RoomsService {
  constructor(
    @InjectRepository(Room) private readonly roomRepository: Repository<Room>,
  ) {}
  create(createRoomDto: CreateRoomDto) {
    return this.roomRepository.save(createRoomDto);
  }

  findAll() {
    return this.roomRepository.find();
  }

  findByHotelId(  id: number) {
    return this.roomRepository.find({
      where: {
        hotel:{
          id
        }
      },
      relations:{
        hotel:true
      }
    });
  }
  async findByIds(ids: Room[]) {
     return this.roomRepository.find({
      where: {
        id: In(ids),
  }
    });
  }

  findOne(id: number) {
    return this.roomRepository.findOne({
      where: {
        id,
      },
    });
  }

  update(id: number, updateRoomDto: UpdateRoomDto) {
    return this.roomRepository.update(id, updateRoomDto);
  }

  remove(id: number) {
    return this.roomRepository.delete(id);
  }
}

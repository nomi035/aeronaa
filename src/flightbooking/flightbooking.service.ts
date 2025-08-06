import { Injectable } from '@nestjs/common';
import { CreateFlightbookingDto } from './dto/create-flightbooking.dto';
import { UpdateFlightbookingDto } from './dto/update-flightbooking.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Flightbooking } from './entities/flightbooking.entity';
import { Repository } from 'typeorm';

@Injectable()
export class FlightbookingService {
  constructor(@InjectRepository(Flightbooking)
private readonly flightBookingRepository:Repository<Flightbooking>){

  }
  create(createFlightbookingDto: CreateFlightbookingDto) {
    return this.flightBookingRepository.save(createFlightbookingDto)
  }

  getUserFlightBookings(id:number){
    return this.flightBookingRepository.findOne({
      where:{
        bookingFor:{
          id
        }
        
      },
      relations:{
        bookingFor:true
        
      }
    })

  }

  findAll() {
    return this.flightBookingRepository.find({
      order:{
       createdAt :'DESC'
      },
      relations:{flight:true}
    })
  }

  findOne(id: number) {
    return this.flightBookingRepository.findOne({
      where:{
        id
      }
    })
  }

  update(id: number, updateFlightbookingDto: UpdateFlightbookingDto) {
    return this.flightBookingRepository.update(id,updateFlightbookingDto)
  }

  remove(id: number) {
    return this.flightBookingRepository.delete(id)
  }
}

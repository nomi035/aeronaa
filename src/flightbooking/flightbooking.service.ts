import { Injectable } from '@nestjs/common';
import { CreateFlightbookingDto } from './dto/create-flightbooking.dto';
import { UpdateFlightbookingDto } from './dto/update-flightbooking.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Flightbooking, Status } from './entities/flightbooking.entity';
import { LessThan, MoreThan, Repository } from 'typeorm';

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
      relations:['bookingFor','flight']
    })

  }

  getUserUpcomingBookings(id:number){
    return this.flightBookingRepository.find({
      where:{
        bookingFor:{id},
        flight:{
          arrivalDate:MoreThan(new Date(Date.now() - 86400000)),
        }
      },
      relations:['bookingFor','flight'],
      order:{
        flight:{
          arrivalDate:'ASC'
        }
      }
      
    })

    
      
    
  }

   getUserPastBookings(id:number){
    return this.flightBookingRepository.find({
      where:{
        bookingFor:{id},
        flight:{
          arrivalDate:LessThan(new Date(Date.now() - 86400000)),
        }
      },
       relations:['bookingFor','flight'],
      order:{
        flight:{
          arrivalDate:'DESC'
        }
      }
      
    })

    
      
    
  }

  findAll(status:Status) {
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

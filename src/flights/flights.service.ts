import { Injectable } from '@nestjs/common';
import { CreateFlightDto } from './dto/create-flight.dto';
import { UpdateFlightDto } from './dto/update-flight.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Flight } from './entities/flight.entity';
import { Repository } from 'typeorm';
import { CreateSegmentDto } from './dto/create-segment.dto';
import { FlightSegment } from './entities/segment.entity';
import { UpdateSegmentDto } from './dto/update-segment.dto';

@Injectable()
export class FlightsService {
  constructor(
    @InjectRepository(Flight)
    private flightRepository: Repository<Flight>,
     @InjectRepository(FlightSegment)
    private segmentRepository: Repository<FlightSegment>,
  ) {}
  create(createFlightDto: CreateFlightDto) {
    return this.flightRepository.save(createFlightDto);
  }

  createSegment(createSegmentDto:CreateSegmentDto){
    return this.segmentRepository.save(createSegmentDto)
  }

  updateSegment(id,updateSegmentDto:UpdateSegmentDto){
    return this.segmentRepository.update(id,updateSegmentDto)
  }

  deleteSegment(id){
    return this.segmentRepository.delete(id)
  }


  findFlightSegment(flightId:number){
    return this.segmentRepository.find({
      where:{flight:{
        id:flightId
      }
      
    },
    relations:{flight:true}
    })
  }

  findAll(from?:string,to?:string,flightClass?:string,departureDate?:Date,returnDate?:Date) {
    return this.flightRepository.find({
      where:{
        from,
        to,
        departureDate,
        returnDate,
        flightClass,
      },
      relations:{segments:true}
    });
  }

  findOne(id: number) {
    return this.flightRepository.findOne({
      where: {
        id,
      },
      relations:{segments:true}
    });
  }

  update(id: number, updateFlightDto: UpdateFlightDto) {
    return this.flightRepository.update(id, updateFlightDto);
  }

  remove(id: number) {
    return this.flightRepository.delete(id);
  }


}

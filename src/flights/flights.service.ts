import { Injectable } from '@nestjs/common';
import { CreateFlightDto } from './dto/create-flight.dto';
import { UpdateFlightDto } from './dto/update-flight.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Flight } from './entities/flight.entity';
import { Repository } from 'typeorm';
import { CreateSegmentDto } from './dto/create-segment.dto';
import { FlightSegment } from './entities/segment.entity';

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
    return this.segmentRepository.create(createSegmentDto)
  }

  findFlightSegment(flightId:number){
    return this.segmentRepository.find({
      where:{flight:{
        id:flightId
      }}
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
      }
    });
  }

  findOne(id: number) {
    return this.flightRepository.findOne({
      where: {
        id,
      },
    });
  }

  update(id: number, updateFlightDto: UpdateFlightDto) {
    return this.flightRepository.update(id, updateFlightDto);
  }

  remove(id: number) {
    return this.flightRepository.delete(id);
  }


}

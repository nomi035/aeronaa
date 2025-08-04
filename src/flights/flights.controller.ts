import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
} from '@nestjs/common';
import { FlightsService } from './flights.service';
import { CreateFlightDto } from './dto/create-flight.dto';
import { UpdateFlightDto } from './dto/update-flight.dto';
import { ApiTags } from '@nestjs/swagger';
import { CreateSegmentDto } from './dto/create-segment.dto';
import { UpdateSegmentDto } from './dto/update-segment.dto';

@ApiTags('flights')
@Controller('flights')
export class FlightsController {
  constructor(private readonly flightsService: FlightsService) {}

  @Post()
  create(@Body() createFlightDto: CreateFlightDto
        ) {
    return this.flightsService.create(createFlightDto);
  }

  @Post('/create/segments')
  async createSegments(@Body()createSegmentDto:CreateSegmentDto){
    return this.flightsService.createSegment(createSegmentDto)

  }

  @Patch('/create/segments/:id')
  async updateSegments(@Body()createSegmentDto:UpdateSegmentDto,@Param('id')id:string){
    return this.flightsService.updateSegment(+id,createSegmentDto)

  }

  @Delete('/create/segments/:id')
  async deleteSegment(@Param('id')id:string){
    return this.flightsService.deleteSegment(+id)
  }


  @Get('/find/segments/:id')
  async findFlightSegments(@Param('id')id:string)
  {
    return this.flightsService.findFlightSegment(+id)
  }

 

  @Get()
  findAll(
    @Query('from') from?: string,
    @Query('to') to?: string,
    @Query('departureDate') departureDate?: string,
    @Query('returnDate') returnDate?: string,
    @Query('flightClass') flightClass?: string,
  ) {
    const parsedDeparture = departureDate ? new Date(departureDate) : undefined;
    const parsedReturn = returnDate ? new Date(returnDate) : undefined;
    return this.flightsService.findAll(
      from,
      to,
      flightClass,
      parsedDeparture,
      parsedReturn,
    );
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.flightsService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateFlightDto: UpdateFlightDto) {
    return this.flightsService.update(+id, updateFlightDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.flightsService.remove(+id);
  }
}

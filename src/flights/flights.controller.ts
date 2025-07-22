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

@ApiTags('flights')
@Controller('flights')
export class FlightsController {
  constructor(private readonly flightsService: FlightsService) {}

  @Post()
  create(@Body() createFlightDto: CreateFlightDto) {
    return this.flightsService.create(createFlightDto);
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

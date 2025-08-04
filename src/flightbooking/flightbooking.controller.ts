import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { FlightbookingService } from './flightbooking.service';
import { CreateFlightbookingDto } from './dto/create-flightbooking.dto';
import { UpdateFlightbookingDto } from './dto/update-flightbooking.dto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('flight-bookings')
@Controller('flightbooking')
export class FlightbookingController {
  constructor(private readonly flightbookingService: FlightbookingService) {}

  @Post()
  create(@Body() createFlightbookingDto: CreateFlightbookingDto) {
    return this.flightbookingService.create(createFlightbookingDto);
  }

  @Get()
  findAll() {
    return this.flightbookingService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.flightbookingService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateFlightbookingDto: UpdateFlightbookingDto) {
    return this.flightbookingService.update(+id, updateFlightbookingDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.flightbookingService.remove(+id);
  }
}

import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { FlightbookingService } from './flightbooking.service';
import { CreateFlightbookingDto } from './dto/create-flightbooking.dto';
import { UpdateFlightbookingDto } from './dto/update-flightbooking.dto';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/guard';
import { currentUser } from 'src/decorator/currentuser';

@ApiTags('flight-bookings')
@Controller('flightbooking')
export class FlightbookingController {
  constructor(private readonly flightbookingService: FlightbookingService) {}

  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Post()
  create(@Body() createFlightbookingDto: CreateFlightbookingDto, @currentUser() user: any) {
    return this.flightbookingService.create({...createFlightbookingDto,bookingFor:user.userId});
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

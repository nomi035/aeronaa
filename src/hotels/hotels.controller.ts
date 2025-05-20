import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { HotelsService } from './hotels.service';
import { CreateHotelDto } from './dto/create-hotel.dto';
import { UpdateHotelDto } from './dto/update-hotel.dto';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/guard';
import { currentUser } from '../decorator/currentuser';
import { UserService } from 'src/user/user.service';

@ApiBearerAuth()
@Controller('hotels')
@ApiTags('hotels')
export class HotelsController {
  constructor(private readonly hotelsService: HotelsService,
    private readonly usersService: UserService
  ) {}

  @Post()
  @UseGuards(JwtAuthGuard)
  async create(@Body() createHotelDto: CreateHotelDto,@currentUser()user:any) {
    const currentUser = await this.usersService.findOne(user.userId)
    return this.hotelsService.create({...createHotelDto,user:currentUser});
  }

  @Get()
  @UseGuards(JwtAuthGuard)
 async findAll(@currentUser()user:any) {
    return this.hotelsService.findAll(user.userId);
  }
    @Get('/pending')
  @UseGuards(JwtAuthGuard)
 async findHotelPending(@currentUser()user:any) {
    return this.hotelsService.findPendingHotel(user.userId);
  }

     @Get('/completed')
  @UseGuards(JwtAuthGuard)
 async findHotelCompleted(@currentUser()user:any) {
    return this.hotelsService.findCompletedHotel(user.userId);
  }


  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.hotelsService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateHotelDto: UpdateHotelDto) {
    return this.hotelsService.update(+id, updateHotelDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.hotelsService.remove(+id);
  }
}

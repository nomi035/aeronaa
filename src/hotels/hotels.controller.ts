import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  HttpException,
  UseInterceptors,
  UploadedFiles,
} from '@nestjs/common';
import { AnyFilesInterceptor, FileInterceptor } from '@nestjs/platform-express';
import { HotelsService } from './hotels.service';
import { CreateHotelDto } from './dto/create-hotel.dto';
import { UpdateHotelDto } from './dto/update-hotel.dto';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/guard';
import { currentUser } from '../decorator/currentuser';
import { UserService } from 'src/user/user.service';
import { BookingsService } from 'src/bookings/bookings.service';
import { CreateFavouriteDto } from 'src/bookings/dto/create-favourite.dto';
import { FileService } from 'src/file-upload/file-upload.service';

@ApiBearerAuth()
@Controller('hotels')
@ApiTags('hotels')
export class HotelsController {
  constructor(
    private readonly hotelsService: HotelsService,
    private readonly usersService: UserService,
    private readonly bookingsService: BookingsService,
    private readonly fileUploadService:FileService,
  ) {}

  @Post()
  @UseGuards(JwtAuthGuard)
  @UseInterceptors(AnyFilesInterceptor())
  async create(
    @Body() createHotelDto: CreateHotelDto,
    @currentUser() user: any,
    @UploadedFiles() files: Array<Express.Multer.File>,
  ) {
    const currentUser = await this.usersService.findOne(user.userId);
      var images = [];
      if(files?.length > 0){
    for (const [index, file] of files.entries()) {
      var url: any;
        url = await this.fileUploadService.uploadToS3(file.buffer, file.originalname);
        images.push(url.Location);
     }
    return this.hotelsService.create({ ...createHotelDto, user: currentUser,images: images });
  }
  else
  return this.hotelsService.create({ ...createHotelDto, user: currentUser});
}

  @Get()
  @UseGuards(JwtAuthGuard)
  async findAll(@currentUser() user: any) {
    return this.hotelsService.findAll(user.userId);
  }

  @Get('/all/list')
  async findAllHotels() {
    return this.hotelsService.findAllHotels();
  }

  @Get('/pending')
  @UseGuards(JwtAuthGuard)
  async findHotelPending(@currentUser() user: any) {
    return this.hotelsService.findPendingHotel(user.userId);
  }

  @Get('/completed')
  @UseGuards(JwtAuthGuard)
  async findHotelCompleted(@currentUser() user: any) {
    return this.hotelsService.findCompletedHotel(user.userId);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.hotelsService.findOne(+id);
  }

  @UseInterceptors(AnyFilesInterceptor())
  @Patch(':id')
  async update(@Param('id') id: string, @Body() updateHotelDto: UpdateHotelDto, @UploadedFiles() files: Array<Express.Multer.File>) {

      var images = [];
      if(files?.length > 0){
    for (const [index, file] of files.entries()) {
      var url: any;
        url = await this.fileUploadService.uploadToS3(file.buffer, file.originalname);
        images.push(url.Location);
     }
    return this.hotelsService.update(+id,{ ...updateHotelDto,images: images });
  }
  else
  return this.hotelsService.update(+id,updateHotelDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.hotelsService.remove(+id);
  }

  @Post('/add/favourites')
  @UseGuards(JwtAuthGuard)
  async createFavourite(
    @Body() createFavouriteDto: CreateFavouriteDto,
    @currentUser() user: any,
  ) {
    const currentUser = await this.usersService.findOne(user.userId);
    const existingFavourite = await this.bookingsService.findFavourite(
      currentUser.id,
      createFavouriteDto.hotel as any,
    );
    if (existingFavourite.length > 0) {
      throw new HttpException('Favourite already exists', 400);
    }

    return this.bookingsService.createFavourite({
      ...createFavouriteDto,
      user: currentUser,
    });
  }

  @Get('/favourites/users')
  @UseGuards(JwtAuthGuard)
  async findAllFavourite(@currentUser() user: any) {
    return this.bookingsService.findUserFavourites(user.userId);
  }

  @Get('admin/vendors/:id')
  async findVendorHotels(@Param('id') id: string) {
    return this.hotelsService.findAll(+id);
  }

  @Delete('/favourites/:id')
  async removeFavourite(@Param('id') id: string) {
    return await this.bookingsService.removeFavourite(+id);
  }
}

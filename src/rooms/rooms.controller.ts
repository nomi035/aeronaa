import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseInterceptors,
  UploadedFiles,
} from '@nestjs/common';
import { RoomsService } from './rooms.service';
import { CreateRoomDto } from './dto/create-room.dto';
import { UpdateRoomDto } from './dto/update-room.dto';
import { ApiTags } from '@nestjs/swagger';
import { AnyFilesInterceptor } from '@nestjs/platform-express';
import { FileService } from 'src/file-upload/file-upload.service';

@Controller('rooms')
@ApiTags('Room')
export class RoomsController {
  constructor(
    private readonly roomsService: RoomsService,
    private readonly fileUploadService: FileService,
  ) {}

  @Post()
  @UseInterceptors(AnyFilesInterceptor())
  async create(
    @Body() createRoomDto: CreateRoomDto,
    @UploadedFiles() files: Array<Express.Multer.File>,
  ) {
    var images = [];
    if (files?.length > 0) {
      for (const [index, file] of files.entries()) {
        var url: any;
        url = await this.fileUploadService.uploadToS3(
          file.buffer,
          file.originalname,
        );
        images.push(url.Location);
      }
      return this.roomsService.create({ ...createRoomDto, images: images });
    } else return this.roomsService.create(createRoomDto);
  }

  @Get()
  findAll() {
    return this.roomsService.findAll();
  }

  @Get('/hotel/:id')
  async findByHotelId(@Param('id') id: string) {
    return this.roomsService.findByHotelId(+id);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.roomsService.findOne(+id);
  }

  @Patch(':id')
  @UseInterceptors(AnyFilesInterceptor())
 async update(
    @Param('id') id: string,
    @Body() updateRoomDto: UpdateRoomDto,
    @UploadedFiles() files: Array<Express.Multer.File>,
  ) {
    var images = [];
    if (files?.length > 0) {
      for (const [index, file] of files.entries()) {
        var url: any;
        url = await this.fileUploadService.uploadToS3(
          file.buffer,
          file.originalname,
        );
        images.push(url.Location);
      }
      return this.roomsService.update(+id,{ ...updateRoomDto, images: images });
    } else return this.roomsService.update(+id,updateRoomDto);
    
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.roomsService.remove(+id);
  }
}

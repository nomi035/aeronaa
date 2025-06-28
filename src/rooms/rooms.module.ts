import { Module } from '@nestjs/common';
import { RoomsService } from './rooms.service';
import { RoomsController } from './rooms.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Room } from './entities/room.entity';
import { FileUploadModule } from 'src/file-upload/file-upload.module';

@Module({
  controllers: [RoomsController],
  providers: [RoomsService],
  exports: [RoomsService],
  imports: [TypeOrmModule.forFeature([Room]),FileUploadModule],
})
export class RoomsModule {}

import { Module } from '@nestjs/common';
import { FileService } from './file-upload.service';
//  const result = await this.fileService.uploadToS3(
//   file.buffer,
//   file.originalname,
// );
@Module({
  providers: [FileService],
  exports:[FileService]
})
export class FileUploadModule {}

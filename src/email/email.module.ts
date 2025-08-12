import { EmailService } from './email.service';
import { EmailController } from './email.controller';
import { Module } from '@nestjs/common/decorators';

@Module({
  controllers: [EmailController],
  providers: [EmailService],
  exports:[EmailService]
})
export class EmailModule {}

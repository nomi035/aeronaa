import { EmailService } from './email.service';
import { UpdateEmailDto } from './dto/update-email.dto';
import { CreateEmailDto } from './dto/create-email.dto';
import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common/decorators';

@Controller('email')
export class EmailController {
  constructor(private readonly emailService: EmailService) {}

  @Post('send-email')
  async sendEmail(@Body() sendMailDto: CreateEmailDto) {
  //   return this.emailService.sendMail(sendMailDto);
   }

  @Get()
  findAll() {
    return this.emailService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.emailService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateEmailDto: UpdateEmailDto) {
    return this.emailService.update(+id, updateEmailDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.emailService.remove(+id);
  }
}

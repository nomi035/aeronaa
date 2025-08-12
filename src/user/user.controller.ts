import { Controller, Get, Post, Body, Patch, Param, Delete, HttpException, UseGuards, Query } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { ApiBearerAuth, ApiBody, ApiTags } from '@nestjs/swagger';
import { UserSwaggerSchema } from './user.swagger-schema';
import { JwtAuthGuard } from 'src/auth/guard';
import { EmailService } from 'src/email/email.service';
import { CreateEmailDto } from 'src/email/dto/create-email.dto';


@Controller('user')
@ApiTags('user')
@ApiBearerAuth()
export class UserController {
  constructor(
    private readonly userService: UserService,
    private readonly emailService: EmailService
  ) { }

  @ApiBody(UserSwaggerSchema.createUserBody)
  @Post()
  async create(@Body() createUserDto: CreateUserDto) {
    const emailDto:CreateEmailDto=null

    const verificationCode = Math.floor(100000 + Math.random() * 900000).toString();

    const userExists = await this.userService.findByEmail(
      createUserDto.email
    );
    if (userExists)
      throw new HttpException('User already exists', 400);
    else {
     await this.userService.create({ ...createUserDto, isEmailVerified: false, verificationCode });
      await this.emailService.sendMail(
        {
          ...emailDto,
          to: createUserDto.email,
          subject:'email Verification',
          text:'your verification code'
        },
        verificationCode
      )
        
  }}


  @Post('/verify/email')
  async verifyUser(@Query('email') email: string, @Query('verificationCode') verificationCode: string) {
    return this.userService.verifyUser(email, verificationCode);
  }

  @Get()
  findAll() {
    return this.userService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.userService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.userService.update(+id, updateUserDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.userService.remove(+id);
  }
}

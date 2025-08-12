// src/mail/dto/send-mail.dto.ts

import { IsEmail, IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateEmailDto {
  @ApiProperty({
    example: 'receiver@example.com',
    description: 'The email address of the recipient',
  })
  @IsEmail()
  @IsNotEmpty()
  to: string;

  @ApiProperty({
    example: 'Welcome to NestJS!',
    description: 'The subject of the email',
  })
  @IsString()
  @IsNotEmpty()
  subject: string;

  @ApiProperty({
    example: 'This is a plain text message.',
    description: 'Plain text version of the email body',
  })
  @IsString()
  @IsNotEmpty()
  text: string;

  
}

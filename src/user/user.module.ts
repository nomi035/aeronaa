import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { EmailModule } from 'src/email/email.module';

@Module({
  imports: [TypeOrmModule.forFeature([User]),EmailModule],
  controllers: [UserController],
  providers: [UserService],
  exports: [UserService] // Exporting the service to be used in other modules
})
export class UserModule {}

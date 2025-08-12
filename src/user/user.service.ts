import { Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Role, User } from './entities/user.entity';
import { Repository } from 'typeorm';
import { EmailService } from 'src/email/email.service';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly usersRepository: Repository<User>,
   
  ) {}
async  create(createUserDto: CreateUserDto) {
    return await this.usersRepository.save(createUserDto);
  }

async verifyUser(email: string, verificationCode: string) {
  const user = await this.findByEmail(email);
  if (!user) {
    throw new NotFoundException('User not found');
  }
  if (user.verificationCode !== verificationCode) {
    throw new UnauthorizedException('Invalid verification code');
  }
  user.isEmailVerified = true;
  user.verificationCode = null;
  await this.update(user.id, user);
  return user;
}

 async findAll() {
   return await this.usersRepository.find();
  }

  async findByEmail(email: string) {
    return await this.usersRepository.findOne({where:{email}});

  }

  async findOne(id: number) {
    return await this.usersRepository.findOne({where:{id}});
  }

  async update(id: number, updateUserDto: UpdateUserDto) {
    return await this.usersRepository.update(id, updateUserDto);
  }

  async remove(id: number) {
    return await this.usersRepository.delete(id);
  }
  async findTotalUsers(){
    const userCount=await this.usersRepository.count({
      where:{
        role:Role.USER
      }
    })
    const vendorCount=await this.usersRepository.count({
      where:{
        role:Role.VENDOR
      }
    })
    return {
      userCount,
      vendorCount
    }
  }
}

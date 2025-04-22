import { Role } from '../entities/user.entity';
import { IsOptional } from 'class-validator';

export class CreateUserDto {

  name: string;

  password: string;

  email: string;
  phone: string;


  country: string;

  currency: string;
  role: Role;
}

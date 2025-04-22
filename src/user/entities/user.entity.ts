import { BaseEntity } from 'base.entity';
import { Column, Entity } from 'typeorm';

@Entity('User')
export class User extends BaseEntity {
  @Column()
  name: string;
  @Column()
  password: string;
  @Column()
  email: string;
  @Column()
  phone: string;
  @Column({ nullable: true })
  address: string;
  Role: Role;
}

export enum Role {
  TEACHER = 'teacher',
  ADMIN = 'admin',
  STUDENT = 'student',
}

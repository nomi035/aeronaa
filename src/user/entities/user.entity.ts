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
  @Column({nullable:true})
  role: Role;

  @Column({default:false,nullable:true })
  isEmailVerified: boolean;

  @Column({ nullable: true })
  verificationCode: string;
}

export enum Role {
 VENDOR='vendor',
 USER='user',
 ADMIN='admin',
 SUPPORT='support'

}

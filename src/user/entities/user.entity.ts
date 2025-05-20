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
}

export enum Role {
 VENDOR='vendor',
 USER='user',
 ADMIN='admin',

}

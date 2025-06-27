import { BaseEntity } from 'base.entity';
import { User } from 'src/user/entities/user.entity';
import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';

@Entity('Hotels')
export class Hotel extends BaseEntity {
  @Column({ nullable: true }) name: string;

  @Column({ nullable: true })
  description: string;

  @Column({ nullable: true })
  starRating: string;

  @Column({ nullable: true })
  Address: string;

  @Column({ nullable: true })
  city: string;

  @Column({
    nullable: true,
  })
  state: string;

  @Column({
    nullable: true,
  })
  zipCode: string;

  @Column({ nullable: true })
  country: string;

  @Column({ type: 'time', nullable: true })
  checkInTime: string;

  @Column({ type: 'time', nullable: true })
  checkOutTime: string;

  @Column({ nullable: true })
  availableFrom: Date;

  @Column({ nullable: true })
  availableTo: Date;

  @Column('text', { array: true, nullable: true })
  amenities: string[];

  @Column('text', {
    nullable: true,
    array: true,
  })
  images: string[];

  @Column('text', {
    nullable: true,
    array: true,
  })
  tags: string[];

  @Column({
    nullable: true,
  })
  isCompleted: number;

    @ManyToOne(() => User, {
    onDelete: 'CASCADE',
  })
  @JoinColumn()
  user: User;

  @Column({
    default:true
  })
  dataByApi: boolean;

  @Column({
    default:null
  })
  apiId: string;
}

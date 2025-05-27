import { BaseEntity } from "base.entity";
import { Booking } from "src/bookings/entities/booking.entity";
import { Hotel } from "src/hotels/entities/hotel.entity";
import { Column, Entity, JoinColumn, ManyToMany, ManyToOne } from "typeorm";

@Entity('rooms')
export class Room extends BaseEntity{
   @Column()
  roomType: RoomType

  @Column()
  description: string

  @Column()
  maxOccupancy: string

  @Column("simple-json")
  bedConfiguration: [
    {
      type: string,
      count: string
    }
  ]

  @Column()
  roomSize: number

  @Column()
  roomSizeUnit: string

  @Column()
  basePrice: number

  @Column({
    nullable:true
  })
  discountedPrice?: number

  @Column('text', {
    nullable: true,
    array: true,
  })
  amenities?: string[]

  @Column('text', {
    nullable: true,
    array: true,
  })
  images?: string[]

  @Column()
  quantity: number

  @Column()
  smokingAllowed: boolean

  @ManyToOne(() => Hotel, {
      onDelete: 'CASCADE',
    })
    @JoinColumn()
    hotel: Hotel;

    @ManyToMany(() => Booking, (booking) => booking.room,{
      onDelete: 'CASCADE',
    })
    @JoinColumn()
    booking: Booking;

}
export enum RoomType {
STANDARD='standard',
DELUXE='deluxe',
SUITE='suite',
EXECUTIVE='executive',
FAMILY='family',
CONNECTING='connecting',

}

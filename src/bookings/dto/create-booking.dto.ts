import { ApiProperty } from '@nestjs/swagger';
import { Hotel } from 'src/hotels/entities/hotel.entity';
import { Room } from 'src/rooms/entities/room.entity';
import { User } from 'src/user/entities/user.entity';

export class CreateBookingDto {
  @ApiProperty()
  checkIndate: Date;

  @ApiProperty()
  checkOutDate: Date;

  @ApiProperty()
  numberOfDays: number;

  @ApiProperty()
  amount: number;


  user: User;

  @ApiProperty()
  room: Room[];

  @ApiProperty()
  hotel: Hotel;
}

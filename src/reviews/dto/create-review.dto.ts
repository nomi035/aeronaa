import { ApiProperty } from '@nestjs/swagger';
import { Hotel } from 'src/hotels/entities/hotel.entity';
import { User } from 'src/user/entities/user.entity';

export class CreateReviewDto {
  @ApiProperty()
  description: string;

  @ApiProperty()
  rating: number;


  user: User;

 @ApiProperty()
  hotel: Hotel;
}

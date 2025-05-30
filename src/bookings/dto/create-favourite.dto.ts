import { ApiProperty } from '@nestjs/swagger';
import { Hotel } from 'src/hotels/entities/hotel.entity';
import { User } from 'src/user/entities/user.entity';

export class CreateFavouriteDto {
  user: User;

  @ApiProperty({
    description: 'The id of the hotel that is being added to favourites',
  })
  hotel: Hotel;
}

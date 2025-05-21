import { ApiProperty } from "@nestjs/swagger"
import { Hotel } from "src/hotels/entities/hotel.entity"
import { RoomType } from "../entities/room.entity"

export class CreateRoomDto {
       @ApiProperty()
      roomType: RoomType

      @ApiProperty()
      description: string

      @ApiProperty()
      maxOccupancy: string

      @ApiProperty()
      bedConfiguration: [
        {
          type: string,
          count: string
        }
      ]

      @ApiProperty()
      roomSize: number

      @ApiProperty()
      roomSizeUnit: string

      @ApiProperty()
      basePrice: number

      @ApiProperty()
      discountedPrice?: number

      @ApiProperty()
      amenities?: string[]

      @ApiProperty()
      images?: string[]

      @ApiProperty()
      quantity: number

      @ApiProperty()
      smokingAllowed: boolean

      @ApiProperty({
        description:'id of the hotel'
      })
        hotel: Hotel;
}

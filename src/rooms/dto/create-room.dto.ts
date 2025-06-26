import { ApiProperty } from "@nestjs/swagger"
import { Hotel } from "src/hotels/entities/hotel.entity"
import { RoomType } from "../entities/room.entity"
import { Transform } from "class-transformer"

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
      @Transform(({ value }) => Math.floor(parseFloat(value)))
      roomSize: number

      @ApiProperty()
      roomSizeUnit: string

      @ApiProperty()
       @Transform(({ value }) => Math.floor(parseFloat(value)))
      basePrice: number

      @ApiProperty()
       @Transform(({ value }) => Math.floor(parseFloat(value)))
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

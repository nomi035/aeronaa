import { ApiProperty } from "@nestjs/swagger"
import { Flight } from "src/flights/entities/flight.entity"

export class CreateFlightbookingDto {
    @ApiProperty()
    firstName: string

    @ApiProperty()
    middleName?: string

    @ApiProperty()
    lastName: string

    @ApiProperty()
    dob: Date

    @ApiProperty()
    gender: string

    @ApiProperty()
    email: string

    @ApiProperty()
    phoneNumber: string

    @ApiProperty()
    passportNumber: string

    @ApiProperty()
    passportExpirationDate: Date

    @ApiProperty()
    country: string

    @ApiProperty()
    nationality: string

    @ApiProperty()
    flight:Flight

}

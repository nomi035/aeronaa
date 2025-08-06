import { ApiProperty } from "@nestjs/swagger"
import { Flight } from "src/flights/entities/flight.entity"
import { User } from "src/user/entities/user.entity"
import {
    Status
} from "../entities/flightbooking.entity"

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

    bookingFor:User

    @ApiProperty()
    bookingStatus:Status

}

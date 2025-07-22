import { ApiProperty } from "@nestjs/swagger";

export class CreateFlightDto {
@ApiProperty()
    tripType:string

@ApiProperty()
    from:string

@ApiProperty()
    to:string

@ApiProperty()
    departureDate: Date;

  @ApiProperty()
    returnDate?: Date;

@ApiProperty()
    arrivalDate:Date

@ApiProperty()
    flightClass:string

@ApiProperty()
    fare:number
@ApiProperty()
    companyName:string
}

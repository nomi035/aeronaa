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
returnDate: Date;

@ApiProperty()
arrivalDate:Date

@ApiProperty()
flightClass:string


@ApiProperty()
flightNumber:string

@ApiProperty()
departureAirport:string

@ApiProperty()
arrivalAirport:string

@ApiProperty()
departureTime:Date

@ApiProperty()
arrivalTime:Date

@ApiProperty()
airline:string

@ApiProperty()
basePrice:number

@ApiProperty()
taxPrice:number

@ApiProperty()
totalPrice:number

@ApiProperty()
currency:string

@ApiProperty()
cancellationAllowedUntill:string

@ApiProperty()
isRefundable:boolean

@ApiProperty()
cancellationPenalty:number

@ApiProperty()
voidableUntil:Date;


@ApiProperty()
passengerType:string;

@ApiProperty()
passportRequired:boolean;

@ApiProperty()
seatSelectionAllowed:boolean;

@ApiProperty()
recheckBagsRequired:boolean;

@ApiProperty()
checkedBaggage:string

@ApiProperty()
cabbinBaggage:string;

}

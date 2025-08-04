import { ApiProduces, ApiProperty } from "@nestjs/swagger";
import { CabinClass, SegmentType } from "../entities/segment.entity";
import { Flight } from "../entities/flight.entity";

export class CreateSegmentDto {

    

    @ApiProperty()
    flightNumber: string;

    @ApiProperty()
    departureAirport: string;

    @ApiProperty()
    arrivalAirport: string;

    @ApiProperty()
    departureTime: string;

    @ApiProperty()
    arrivalTime: string;

    @ApiProperty()
    departurelocation: string;

    @ApiProperty()
    arrivallocation: string;

    @ApiProperty()
    flightDuration: number;

    @ApiProperty()
    layoverDuration?: number;

    @ApiProperty()
    aircraftType?: string;

    @ApiProperty()
    operatingCarrier?: string;

    @ApiProperty()
    marketingCarrier?: string;

    @ApiProperty()
    baggageRecheckRequired: boolean;

    @ApiProperty()
    cabinClass: CabinClass;

    @ApiProperty()
    type: SegmentType;

    @ApiProperty({
        description:"its the id of the flight created"
    })
    flight: Flight
}
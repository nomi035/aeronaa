import { BaseEntity } from "base.entity";
import { Column, Entity, OneToMany } from "typeorm";
import { FlightSegment } from "./segment.entity";

@Entity('Flights')
export class Flight extends BaseEntity {
@Column()
tripType:string

@Column()
from:string

@Column()
to:string

@Column()
departureDate: Date;

@Column({
    nullable: true,
})
returnDate: Date;

@Column()
arrivalDate:Date

@Column()
flightClass:string


@Column()
flightNumber:string

@Column()
departureAirport:string

@Column()
arrivalAirport:string

@Column()
departureTime:Date

@Column()
arrivalTime:Date

@Column()
airline:string

@Column()
basePrice:number

@Column()
taxPrice:number

@Column()
totalPrice:number

@Column()
currency:string

@Column()
cancellationAllowedUntill:string

@Column()
isRefundable:boolean

@Column()
cancellationPenalty:number

@Column()
voidableUntil:Date;


@Column()
passengerType:string;

@Column()
passportRequired:boolean;

@Column()
seatSelectionAllowed:boolean;

@Column()
recheckBagsRequired:boolean;

@Column()
checkedBaggage:string

@Column()
cabbinBaggage:string;

@OneToMany(()=> FlightSegment,(segment)=> segment.flight,{onDelete:'CASCADE'})
segments:FlightSegment[]


}
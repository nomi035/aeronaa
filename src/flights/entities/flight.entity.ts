import { BaseEntity } from "base.entity";
import { Column, Entity } from "typeorm";

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
fare:number

@Column()
companyName:string

}
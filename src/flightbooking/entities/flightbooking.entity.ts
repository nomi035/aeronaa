import { BaseEntity } from "base.entity";
import { Flight } from "src/flights/entities/flight.entity";
import { User } from "src/user/entities/user.entity";
import { Column, Entity, JoinColumn, ManyToOne } from "typeorm";

@Entity('flight-booking')
export class Flightbooking extends BaseEntity{
    @Column()
    firstName:string

    @Column({
        nullable:true
    })
    middleName?:string
    
    @Column()
    lastName:string

    @Column()
    dob:Date

    @Column()
    gender:string

    @Column()
    email:string

    @Column()
    phoneNumber:string

    @Column()
    passportNumber:string

    @Column()
    passportExpirationDate:Date

    @Column()
    country:string

    @Column()
    nationality:string

    @ManyToOne(()=>(Flight),{onDelete:'CASCADE'})
    @JoinColumn()
    flight:Flight

    @ManyToOne(()=>(User),{onDelete:'CASCADE'})
    @JoinColumn()
    bookingFor:User




}

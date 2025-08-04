import { BaseEntity } from 'base.entity';
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import { Flight } from './flight.entity';

export enum CabinClass {
    ECONOMY = 'economy',
    BUSINESS = 'business',
    FIRST = 'first',
}
export enum SegmentType {
    OUTBOUND = 'outbound',
    RETURN = 'return'
}

@Entity('segment')
export class FlightSegment extends BaseEntity {


    @Column()
    flightNumber: string;

    @Column()
    departureAirport: string;

    @Column()
    arrivalAirport: string;

    @Column()
    departureTime: string;

    @Column()
    arrivalTime: string;

    @Column()
    departurelocation: string;

    @Column()
    arrivallocation: string;

    @Column('int')
    flightDuration: number;

    @Column('int', { nullable: true })
    layoverDuration?: number;

    @Column({ nullable: true })
    aircraftType?: string;

    @Column({ nullable: true })
    operatingCarrier?: string;

    @Column({ nullable: true })
    marketingCarrier?: string;

    @Column()
    baggageRecheckRequired: boolean;

    @Column({
        type: 'enum',
        enum: CabinClass,
    })
    cabinClass: CabinClass;

    @Column({
        type: 'enum',
        enum: SegmentType,
    })
    type: SegmentType;

    @ManyToOne(() => Flight, {
        onDelete: 'CASCADE',
    })
    @JoinColumn()
    flight: Flight
}

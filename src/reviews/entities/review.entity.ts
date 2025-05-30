import { BaseEntity } from "base.entity";
import { Hotel } from "src/hotels/entities/hotel.entity";
import { User } from "src/user/entities/user.entity";
import { Column, Entity, JoinColumn, ManyToOne } from "typeorm";

@Entity('reviews')
export class Review extends BaseEntity{
    @Column()
    description: string;

    @Column()
    rating: number;

    @ManyToOne(() => User, { onDelete: 'CASCADE' })
      @JoinColumn()
      user: User;

      @ManyToOne(() => Hotel, { onDelete: 'CASCADE' })
      @JoinColumn()
      hotel: Hotel;



}

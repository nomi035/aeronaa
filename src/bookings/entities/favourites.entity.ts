import { BaseEntity } from "base.entity";
import { Hotel } from "src/hotels/entities/hotel.entity";
import { User } from "src/user/entities/user.entity";
import { Entity, JoinColumn, ManyToOne, OneToOne } from "typeorm";

@Entity('favourites')
export class Favourites extends BaseEntity{

@ManyToOne(() => User, { onDelete: 'CASCADE' })
  @JoinColumn()
  user: User;

  @ManyToOne(() => Hotel, { onDelete: 'CASCADE' })
  @JoinColumn()
  hotel: Hotel;

}
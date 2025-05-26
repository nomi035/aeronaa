import { BaseEntity } from "base.entity";
import { Hotel } from "src/hotels/entities/hotel.entity";
import { User } from "src/user/entities/user.entity";
import { Entity, JoinColumn, OneToOne } from "typeorm";

@Entity('favourites')
export class Favourites extends BaseEntity{

@OneToOne(() => User, { onDelete: 'CASCADE' })
  @JoinColumn()
  user: User;

  @OneToOne(() => Hotel, { onDelete: 'CASCADE' })
  @JoinColumn()
  hotel: Hotel;

}
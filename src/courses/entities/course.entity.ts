import { BaseEntity } from "base.entity";
import { Column, Entity } from "typeorm";

@Entity('Courses')
export class Course extends BaseEntity{
    @Column()
    name: string;

    @Column()
    description: string;
    


}

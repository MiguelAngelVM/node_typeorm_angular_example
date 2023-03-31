import { Column, Entity, OneToMany } from 'typeorm';
import Model from './model.entity';
import { User } from './user.entity';
import { Vehicle } from './vehicle.entity';

@Entity('cat_car_states')
export class CatCarState extends Model {
  @Column({
    unique: true,
  })

  @Column()
  name: string;

  @OneToMany(() => Vehicle, (vehicle) => vehicle.catCarState)
  vehicles: Vehicle[];
}

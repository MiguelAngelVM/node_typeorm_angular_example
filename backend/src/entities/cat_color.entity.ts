import { Column, Entity, JoinColumn, OneToMany } from 'typeorm';
import Model from './model.entity';
import { User } from './user.entity';
import { Vehicle } from './vehicle.entity';

@Entity('cat_colors')
export class CatColors extends Model {
  @Column({
    unique: true,
  })

  @Column()
  name: string;

  @OneToMany(() => Vehicle, (vehicle) => vehicle.catColor)
  vehicles: Vehicle[];
}

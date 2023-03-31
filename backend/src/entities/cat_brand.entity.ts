import { Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import Model from './model.entity';
import { Vehicle } from './vehicle.entity';

@Entity('cat_brands')
export class CatBrand extends Model {
  @PrimaryGeneratedColumn()
  id: string

  @Column({
    unique: true,
  })
  name: string;

  @OneToMany(() => Vehicle, (vehicle) => vehicle.catBrand)
  vehicles: Vehicle[];
}

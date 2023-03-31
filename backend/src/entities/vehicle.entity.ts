import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { CatBrand } from './cat_brand.entity';
import { CatCarState } from './cat_car_state.entity';
import { CatColors } from './cat_color.entity';
import Model from './model.entity';
import { User } from './user.entity';

@Entity('vehicles')
export class Vehicle extends Model {
  @PrimaryGeneratedColumn()
  id: string

  @Column({
    default: false,
  })
  assigned: boolean;

  @Column()
  admission_date: Date;

  @Column()
  model_year: Date;

  @ManyToOne(() => CatBrand, (catBrand) => catBrand.vehicles)
  @JoinColumn()
  catBrand: CatBrand;

  @ManyToOne(() => CatColors, (catColor) => catColor.vehicles)
  @JoinColumn()
  catColor: CatColors;

  @ManyToOne(() => CatCarState, (catCarState) => catCarState.vehicles)
  @JoinColumn()
  catCarState: CatCarState;
  
}

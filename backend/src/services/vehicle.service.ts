import {
  FindOptionsOrder,
  FindOptionsRelations,
  FindOptionsSelect,
  FindOptionsWhere,
  Relation,
  RelationOptions,
} from 'typeorm';
import { Vehicle } from '../entities/vehicle.entity';
import { User } from '../entities/user.entity';
import { AppDataSource } from '../utils/data-source';
import { CatBrand } from '../entities/cat_brand.entity';
import { CatColors } from '../entities/cat_color.entity';
import { CatCarState } from '../entities/cat_car_state.entity';

const vehicleRepository = AppDataSource.getRepository(Vehicle);

export const createVehicle = async (
  input: Partial<Vehicle>, 
  catBrand: CatBrand,
  catColor: CatColors,
  catCarState: CatCarState
) => {
  return await vehicleRepository.save(vehicleRepository.create({
    ...input, 
    catBrand, 
    catColor, 
    catCarState
  }));
};

export const getVehicle = async (vehicleId: string) => {
  return await vehicleRepository.findOne({ 
    where: {id: vehicleId},
    relations: ['catBrand', 'catColor', 'catCarState'],
  });
};

export const findVehicles = async (
  where: FindOptionsWhere<Vehicle> = {},
  select: FindOptionsSelect<Vehicle> = {},
  relations: FindOptionsRelations<Vehicle> = {},
  order: FindOptionsOrder<Vehicle> = {}
) => {
  return await vehicleRepository.find({
    where,
    select,
    relations,
    order
  });
};

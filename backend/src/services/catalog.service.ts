import {
  FindOptionsWhere, ILike, Like,
} from 'typeorm';
import { CatBrand } from '../entities/cat_brand.entity';
import { CatCarState } from '../entities/cat_car_state.entity';
import { CatColors } from '../entities/cat_color.entity';
import { AppDataSource } from '../utils/data-source';

const catBrandRepository = AppDataSource.getRepository(CatBrand);
const catColorRepository = AppDataSource.getRepository(CatColors);
const catCarStatepository = AppDataSource.getRepository(CatCarState);

const like = (name:string) => {
  return {
    where: {
      name: ILike(`%${name}%`)
    }
  }
}

export const findCatBrands = async (
  name:string,
) => {
  return await catBrandRepository.find(like(name));
};

export const findCatColors = async (
  name:string,
) => {
  return await catColorRepository.find(like(name));
};

export const findCatCarState = async () => {
  return await catCarStatepository.find();
};

export const findCatBrandsById = async (catBrandsId: string) => {
  return await catBrandRepository.findOneBy({ id: catBrandsId });
};

export const findCatColorById = async (catColorId: string) => {
  return await catColorRepository.findOneBy({ id: catColorId });
};

export const findCatCarStateId = async (catCarStateId: string) => {
  return await catCarStatepository.findOneBy({ id: catCarStateId });
};
import { NextFunction, Request, Response } from 'express';
import {
  UpdateVehicleInput,
  CreateVehicleSchema,
  DeleteVehicleInput,
  GetVehicleInput
} from '../schemas/vehicle.schema';
import { createVehicle, findVehicles, getVehicle } from '../services/vehicle.service';
import AppError from '../utils/appError';
import { findCatBrandsById, findCatCarStateId, findCatColorById } from '../services/catalog.service';
import { CatBrand } from '../entities/cat_brand.entity';
import { CatColors } from '../entities/cat_color.entity';
import { CatCarState } from '../entities/cat_car_state.entity';

interface Filter  {
  field:string,
  content:any,
  secondaryField:string,
  type:string,
}
const getFilters = (req:Request) => {
  const json = req?.query?.params as string;
  let where:any = {}
  if(json){
    const {filters} = JSON.parse(json);
    filters.forEach((filter:Filter) => {
      const {field, secondaryField, type,} = filter;

      const content = filter.content;
      if(!content)
        return;

      if(typeof content === "string" && secondaryField){
        where[field] = {
          id: content
        }
      }

      if(typeof content === "string" && !secondaryField){
        where[field] =  content
      }

      if(typeof content === "object" && secondaryField){
        where[field] = {
          id: content?.id
        }
      }

      if(typeof content === "object" && !secondaryField){
        where[field] =  content?.id
      }

      if(type === 'check'){
        where[field] =  !content
      }
    });
  }
  return where;
}

export const getVehiclesHandler = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  
  const where:any = getFilters(req);

  try {
    const result = await findVehicles(where, {}, 
      {
        catBrand:true,
        catColor:true,
        catCarState:true
      }
    );

    res.status(200).json({
      status: 'success',
      results: result.length,
      data: {
        result,
      },
    });
  } catch (err: any) {
    next(err);
  }
};

export const createVehicleHandler = async (
  req: Request<{}, {}, CreateVehicleSchema>,
  res: Response,
  next: NextFunction
) => {
  try {
    const catBrand = await findCatBrandsById(req.body.cat_brand_id as string);
    const catColor = await findCatColorById(req.body.cat_color_id as string);
    const catCarState = await findCatCarStateId(req.body.cat_car_state_id as string);
    const vehicle = await createVehicle(req.body, catBrand!, catColor!, catCarState!);

    res.status(201).json({
      status: 'success',
      data: {
        vehicle,
      },
    });
  } catch (err: any) {
    if (err.code === '23505') {
      return res.status(409).json({
        status: 'fail',
        message: 'Vehicle already exist',
      });
    }
    next(err);
  }
}

export const updateVehicleHandler = async (
  req: Request<UpdateVehicleInput['params'], {}, UpdateVehicleInput['body']>,
  res: Response,
  next: NextFunction
) => {
  try {
    const vehicle = await getVehicle(req.params.vehicleId);

    if (!vehicle) {
      return next(new AppError(404, 'Vehicle with that ID not found'));
    }

    const catBrand = await findCatBrandsById(req.body.cat_brand_id as string) as CatBrand;
    const catColor = await findCatColorById(req.body.cat_color_id as string) as CatColors;
    const catCarState = await findCatCarStateId(req.body.cat_car_state_id as string) as CatCarState;

    Object.assign(vehicle, req.body);
    console.log(req.body)
    vehicle.catBrand = catBrand;
    vehicle.catColor = catColor;
    vehicle.catCarState = catCarState;

    const updatedvehicle = await vehicle.save();

    res.status(200).json({
      status: 'success',
      data: {
        vehicle: updatedvehicle,
      },
    });
  } catch (err: any) {
    next(err);
  }
};

export const deleteVehicleHandler = async (
  req: Request<DeleteVehicleInput>,
  res: Response,
  next: NextFunction
) => {
  try {
    const vehicle = await getVehicle(req.params.vehicleId);

    if (!vehicle) {
      return next(new AppError(404, 'Vehicle with that ID not found'));
    }

    await vehicle.remove();

    res.status(204).json({
      status: 'success',
      data: null,
    });
  } catch (err: any) {
    next(err);
  }
};

export const getVehicleHandler = async (
  req: Request<GetVehicleInput>,
  res: Response,
  next: NextFunction
) => {
  try {
    const vehicle = await getVehicle(req.params.vehicleId);

    if (!vehicle) {
      return next(new AppError(404, 'Vehicle with that ID not found'));
    }

   
    res.status(200).json({
      status: 'success',
      data: {
        vehicle: vehicle,
      },
    });
  } catch (err: any) {
    next(err);
  }
};
import { NextFunction, Request, Response } from 'express';
import {
  UpdateVehicleInput,
  CreateVehicleSchema,
  DeleteVehicleInput
} from '../schemas/vehicle.schema';
import { createVehicle, findVehicles, getVehicle } from '../services/vehicle.service';
import AppError from '../utils/appError';
import { findCatBrandsById, findCatCarStateId, findCatColorById } from '../services/catalog.service';

export const getVehiclesHandler = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const result = await findVehicles({}, {}, 
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

    Object.assign(vehicle, req.body);

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
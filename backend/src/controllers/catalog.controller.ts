import { NextFunction, Request, Response } from 'express';
import { findCatBrands, findCatCarState, findCatColors } from '../services/catalog.service';
import { brandQuery } from '../schemas/brand.schema';
import { colorQuery } from '../schemas/colors.schema';

const responseSuccess = (result:Array<Object>)=> {
  return {
    status: 'success',
    results: result.length,
    data: {
      result,
    },
  }
}

export const getBrands = async (
  req: Request<brandQuery>,
  res: Response,
  next: NextFunction
) => {
  const name  = req?.query.name as string;
  try {
    const result = await findCatBrands(name);
    res.status(200).json(responseSuccess(result));
  } catch (err: any) {
    next(err);
  }
};

export const getColors = async (
  req: Request<colorQuery>,
  res: Response,
  next: NextFunction
) => {
  const name  = req?.query.name as string;
  try {
    const result = await findCatColors(name);
    res.status(200).json(responseSuccess(result));
  } catch (err: any) {
    next(err);
  }
};

export const getCatCarState = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const result = await findCatCarState();
    res.status(200).json(responseSuccess(result));
  } catch (err: any) {
    next(err);
  }
};

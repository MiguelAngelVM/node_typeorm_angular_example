import { boolean, date, object, string, TypeOf } from 'zod';

const basicVehicle = {
  body: object({
    assigned: boolean({
      required_error: 'assigned is required',
    }),
    admission_date: string({
      required_error: 'admission_date is required',
    }).transform(str => new Date(str)),
    model_year: string({
      required_error: 'model_year is required',
    }).transform(str => new Date(str)),
    cat_brand_id: string({
      required_error: 'cat_brand_id is required',
    }),
    cat_color_id: string({
      required_error: 'cat_color_id is required',
    }),
    cat_car_state_id: string({
      required_error: 'cat_car_state_id is required',
    }),
  }),
}

export const createVehicleSchema = object(basicVehicle);

const params = {
  params: object({
    vehicleId: string(),
  }),
};

export const getPostSchema = object({
  ...params,
});

export const updateVehicleSchema = object({
  ...params,
  body:  object({
    assigned: boolean({
      required_error: 'assigned is required',
    }),
    admission_date: string({
      required_error: 'admission_date is required',
    }).transform(str => new Date(str)),
    model_year: string({
      required_error: 'model_year is required',
    }).transform(str => new Date(str)),
    cat_brand_id: string({
      required_error: 'cat_brand_id is required',
    }),
    cat_color_id: string({
      required_error: 'cat_color_id is required',
    }),
    cat_car_state_id: string({
      required_error: 'cat_car_state_id is required',
    }),
  }).partial(),
});


export const deleteVehicleSchema = object({
  ...params,
});

export type CreateVehicleSchema = TypeOf<typeof createVehicleSchema>['body'];
export type UpdateVehicleInput = TypeOf<typeof updateVehicleSchema>;
export type DeleteVehicleInput = TypeOf<typeof deleteVehicleSchema>['params'];

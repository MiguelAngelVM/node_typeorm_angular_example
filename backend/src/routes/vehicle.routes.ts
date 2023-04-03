import express from 'express';
import {
  createVehicleHandler,
  deleteVehicleHandler,
  // getPostHandler,
  getVehiclesHandler,
  updateVehicleHandler
} from '../controllers/vehicle.controller';
import { deserializeUser } from '../middleware/deserializeUser';
import { requireUser } from '../middleware/requireUser';
import { validate } from '../middleware/validate';
import {
  createVehicleSchema,
  deleteVehicleSchema, updateVehicleSchema
} from '../schemas/vehicle.schema';

const router = express.Router();

router.use(deserializeUser, requireUser);
router
  .route('/')
  .post(
    validate(createVehicleSchema),
    createVehicleHandler
  )
  .get(getVehiclesHandler);

router
  .route('/:vehicleId')
  // .get(validate(getPostSchema), getPostHandler)
  .patch(validate(updateVehicleSchema), updateVehicleHandler)
  .delete(validate(deleteVehicleSchema), deleteVehicleHandler);

export default router;

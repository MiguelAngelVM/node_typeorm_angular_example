import express from 'express';
import { getBrands, getCatCarState, getColors } from '../controllers/catalog.controller';
import { deserializeUser } from '../middleware/deserializeUser';
import { requireUser } from '../middleware/requireUser';
const router = express.Router();

router.use(deserializeUser, requireUser);

router.get('/brans', getBrands);
router.get('/states', getCatCarState);
router.get('/colors', getColors);


export default router;

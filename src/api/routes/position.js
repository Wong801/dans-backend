import { Router } from 'express';
import PositionController from '../controllers/position';
// import authenticate from '../middlewares/authenticate';

const router = Router();

router.get('/', PositionController.search());
router.get('/:id', PositionController.get());

export default router;

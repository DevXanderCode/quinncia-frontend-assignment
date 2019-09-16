import express from 'express';
import controller from '../controllers/photo.controller';

const router = express.Router();

router.post('/', controller.create);
router.put('/:_id', controller.update);
router.get('/:_id', controller.getOne);
router.delete('/:_id', controller.delete);
router.get('/many', controller.getMany);

export default router;

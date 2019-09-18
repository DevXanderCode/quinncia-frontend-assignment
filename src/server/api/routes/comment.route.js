import express from 'express';
import {
  create,
  update,
  getOne,
  remove,
  getMany,
} from '../controllers/comment.controller';

const router = express.Router();

router.post('/', create);
router.put('/:_id', update);
router.get('/:_id', getOne);
router.delete('/:_id', remove);
router.get('/many', getMany);

export default router;

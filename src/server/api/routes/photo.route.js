import multer from 'multer';
import express from 'express';
import {
  create,
  update,
  getOne,
  getContent,
  getMany,
  remove,
  attachTags,
} from '../controllers/photo.controller';

const router = express.Router();

router.post('/', multer({ dest: `${__dirname}/../../storage` }).single('profile'), create);
router.put('/:_id/tags/attach', attachTags);
router.put('/:_id', update);
router.get('/content/:id', getContent);
router.get('/many', getMany);
router.get('/:_id', getOne);
router.delete('/:_id', remove);

export default router;

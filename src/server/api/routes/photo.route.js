import multer from 'multer';
import express from 'express';
import {
  create,
  update,
  getOne,
  getContent,
  getMany,
  remove,
} from '../controllers/photo.controller';

const router = express.Router();

router.post('/', multer({ dest: `${__dirname}/../../storage` }).single('profile'), create);
router.put('/:_id', update);
router.get('/content/:id', getContent);
router.get('/:_id', getOne);
router.delete('/:_id', remove);
router.get('/many', getMany);


// res.download('/report-12345.pdf')

export default router;

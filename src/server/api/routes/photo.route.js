import multer from 'multer';
import express from 'express';
import controller from '../controllers/photo.controller';

const router = express.Router();

router.post('/', multer({ dest: `${__dirname}/../../storage` }).single('profile'), controller.create);
router.put('/:_id', controller.update);
router.get('/content/:id', controller.getContent);
router.get('/:_id', controller.getOne);
router.delete('/:_id', controller.delete);
router.get('/many', controller.getMany);


// res.download('/report-12345.pdf')

export default router;

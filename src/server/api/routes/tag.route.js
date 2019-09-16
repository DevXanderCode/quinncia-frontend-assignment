import express from 'express';
import controller from '../controllers/tag.controller';

const router = express.Router();

router.post('/', controller.create);

export default router;

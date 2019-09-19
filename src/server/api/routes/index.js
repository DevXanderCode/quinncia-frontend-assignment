import express from 'express';
import bodyParser from 'body-parser';

import tagRoutes from './tag.route';
import photoRoutes from './photo.route';
import commentRoutes from './comment.route';

const router = express.Router();

router.get('/status', (req, res) => res.status(200).json({
  status: 'OK',
  message: 'Service is healthy',
}));

router.use(bodyParser.json({ limit: '10mb', extended: true }));
router.use(bodyParser.urlencoded({ limit: '10mb', extended: true }));

router.use('/tag', tagRoutes);
router.use('/photo', photoRoutes);
router.use('/comment', commentRoutes);

export default router;

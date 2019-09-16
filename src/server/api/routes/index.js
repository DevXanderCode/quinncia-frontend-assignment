import express from 'express';

import tagRoutes from './tag.route';
import photoRoutes from './photo.route';
import commentRoutes from './comment.route';

const router = express.Router();

router.get('/status', (req, res, next) => {
  return res.status(200).json({
    status: 'OK',
    message: 'Service is healthy'
  });
});

router.use('/tag', tagRoutes);
router.use('/photo', photoRoutes);
router.use('/comment', commentRoutes);

export default router;
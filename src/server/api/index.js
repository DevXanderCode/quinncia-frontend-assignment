import express from 'express';

import mainRouter from './routes';

const router = express.Router();

router.use('/', mainRouter);

export default router;

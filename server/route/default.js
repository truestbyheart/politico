import express from 'express';
import defaultRoute from '../controller/default';

const router = express.Router();

router.get('/', defaultRoute);

export default router;

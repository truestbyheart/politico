import express from 'express';
import reset from '../controller/reset';

const router = express.Router();

router.post('/', reset);

export default router;

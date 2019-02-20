import express from 'express';
import signup from '../controller/signup';

const router = express.Router();

router.post('/', signup);

export default router;

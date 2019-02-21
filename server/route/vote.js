import express from 'express';
import vote from '../controller/vote';

const router = express.Router();

router.post('/', vote);

export default router;

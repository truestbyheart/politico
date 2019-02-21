import express from 'express';
import result from '../controller/results';

const router = express.Router();

router.get('/:id/results', result);

export default router;

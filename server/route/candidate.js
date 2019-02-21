import express from 'express';
import candidate from '../controller/candidate';

const router = express.Router();

router.post('/', candidate);

export default router;

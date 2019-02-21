import express from 'express';
import candidate from '../controller/candidate';

const router = express.Router();

router.post('/:id/register', candidate);

export default router;

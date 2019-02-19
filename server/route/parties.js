import express from 'express';
import {
  postParty,
  getParties,
  getParty,
  editParty,
  deleteParty,
} from '../controller/parties';

const router = express.Router();

router.post('/', postParty);
router.get('/:id', getParty);
router.get('/', getParties);
router.patch('/:id', editParty);
router.delete('/:id', deleteParty);


export default router;

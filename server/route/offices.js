import express from 'express';
import {
  postOffice,
  getOffices,
  getOffice,
  editOffice,
  deleteOffice,
} from '../controller/office';

const router = express.Router();

router.post('/', postOffice);
router.get('/:id', getOffice);
router.get('/', getOffices);
router.patch('/:id', editOffice);
router.delete('/:id', deleteOffice);


export default router;

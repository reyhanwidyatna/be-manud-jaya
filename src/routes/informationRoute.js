import express from 'express';
import isAuthenticated from '../middleware/auth.js';
import { createInformation, getInformationById, getAllInformation, updateInformation, deleteInformation } from '../controllers/informationController.js';

const router = express.Router();

router.get('/information', getAllInformation);
router.get('/information/:id', getInformationById);

router.post('/information', isAuthenticated, createInformation);
router.put('/information/:id', isAuthenticated, updateInformation);
router.delete('/information/:id', isAuthenticated, deleteInformation);

export default router;

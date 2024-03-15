import express from 'express';
import isAuthenticated from '../middleware/auth.js';
import { createAdministration, getAllAdministrations, getAdministrationById, updateAdministration, deleteAdministration } from '../controllers/administrationController.js';

const router = express.Router();

router.post('/administration', isAuthenticated, createAdministration);
router.get('/administration', isAuthenticated, getAllAdministrations);
router.get('/administration/:id', isAuthenticated, getAdministrationById);
router.put('/administration/:id', isAuthenticated, updateAdministration);
router.delete('/administration/:id', isAuthenticated, deleteAdministration);

export default router;

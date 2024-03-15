import express from 'express';
import { createFinancial, getFinancialById, getAllFinancial, updateFinancial, deleteFinancial } from '../controllers/financialController.js';
import isAuthenticated from '../middleware/auth.js';

const router = express.Router();

router.get('/finance', getAllFinancial);
router.get('/finance/:id', getFinancialById);

router.post('/finance', isAuthenticated, createFinancial);
router.put('/finance/:id', isAuthenticated, updateFinancial);
router.delete('/finance/:id', isAuthenticated, deleteFinancial);

export default router;

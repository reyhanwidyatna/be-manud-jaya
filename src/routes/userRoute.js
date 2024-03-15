import express from 'express';
import isAuthenticated from '../middleware/auth.js';
import { createUser, getUserById, getAllUsers, updateUser, deleteUser, getAllAdmin } from '../controllers/userController.js';

const router = express.Router();

router.post('/register', createUser);
router.get('/admin', getAllAdmin);
router.get('/user/:id', getUserById);

router.get('/user', isAuthenticated, getAllUsers);
router.put('/user/:id', isAuthenticated, updateUser);
router.delete('/user/:id', isAuthenticated, deleteUser);

export default router;

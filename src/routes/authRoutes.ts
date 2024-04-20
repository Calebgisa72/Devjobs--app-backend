import express from 'express';
import { AuthController } from '../controllers/authController';

const router = express.Router();

router.post('/signup', AuthController.signup);
router.post('/login', AuthController.login);
router.get('/users', AuthController.getAllUsers);
router.get('/users/:id', AuthController.getUserById);

export default router;

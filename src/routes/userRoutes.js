// src/routes/userRoutes.js

import express from 'express';
import { registerUser, loginUser, uploadProfileImage } from '../controllers/userController.js';
import upload from '../utils/multer.js';
import authenticate from '../utils/auth.js';

const router = express.Router();

router.post('/register', registerUser);
router.post('/login', loginUser);

router.post('/upload', upload.single('profileImage'),authenticate, uploadProfileImage);


export default router;

import express from 'express';
import { createUser, getProfile, updateProfile } from '../controllers/userController.js';
const router = express.Router();

router.post('/',createUser);
router.get('/',getProfile);
router.patch('/',updateProfile);


export default router;
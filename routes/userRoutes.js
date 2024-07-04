import express from 'express';
import { createUser, getProfile, updateProfile, deleteProfile } from '../controllers/userController.js';
const router = express.Router();

router.post('/',createUser);
router.get('/:userId',getProfile);
router.patch('/:userId',updateProfile);
router.delete('/:userId',deleteProfile)


export default router;
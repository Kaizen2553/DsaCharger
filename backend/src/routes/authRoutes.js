import express from 'express';
import { signup,login,logout,deleteAccount,checkMe } from '../controllers/auth.controller.js';
import { protectRoute } from '../middleware/auth.middleware.js';
const router = express.Router();

router.post('/signup',signup);
router.post('/login',login);
router.post('/logout',logout);
router.post('/delete',protectRoute,deleteAccount);
// router.post('/update',update);
router.get('/check',protectRoute,checkMe);

export default router;
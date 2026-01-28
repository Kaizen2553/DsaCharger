import express from 'express';
import {addProblem,problemlist,problemDetail,reviseProblem,deleteProblem,addNotes, todayRevision} from '../controllers/problem.controller.js'
import {protectRoute} from '../middleware/auth.middleware.js'
const router = express.Router();

router.post('/add',protectRoute,addProblem);
router.get('/list',protectRoute,problemlist);
router.get('/details/:id',protectRoute,problemDetail);
router.put('/revise/:id',protectRoute,reviseProblem);
router.delete('/delete/:id',protectRoute,deleteProblem);
router.put('/notes/:id',protectRoute,addNotes);
router.get('/revision',protectRoute,todayRevision)

export default router;


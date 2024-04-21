import express from 'express';
import JobController  from '../controllers/jobController';
import upload from '../middleWares/multer';
import jobController from '../controllers/jobController';
import { requireSignIn } from '../middleWares/authMiddleware';

const router = express.Router();

//CRUD operations for jobs
router.post('/jobs',requireSignIn, upload.single('logo'), JobController.createJob);
router.get('/jobs', JobController.getAllJobs);
router.get('/jobs/:id', JobController.getJobById);
router.put('/updateJob/:id',requireSignIn, upload.single('logo'), JobController.updateJob);
router.delete('/deleteJob/:id',requireSignIn, JobController.deleteJob);

//Route to add requirements to a job
router.post('/job/requirements/:id',requireSignIn, jobController.pushReqirments
/*
#swagger.tags = ['Add job requirment']
*/
);

//Route to responsability to a job
router.post('/job/whatToDo/:id',requireSignIn, jobController.pushResponsability
/*
#swagger.tags = ['Add job role']
*/
);

export default router;

import { Request, Response } from 'express';
import { JobModel } from '../models/jobModel';
import cloudinary from '../services/cloudinary';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

class JobController {

  //Creating a new job
  async createJob(req: Request, res: Response) {
    try {
      if (!req.file) {
        return res.status(400).json({ message: 'Logo is required' });
      }

      const { jobType, title, company, country, description, webLink } = req.body;
      const result = await cloudinary.uploader.upload(req.file.path);

      const jobData = {
        logo: result.secure_url,
        posted: new Date(),
        jobType,
        title,
        company,
        country,
        description,
        webLink,
      };

    const job = await prisma.job.create({data:jobData});
      return res.status(201).json({ message: 'Job created successfully', job });
    } catch (error) {
      console.error('Error creating job:', error);
      return res.status(500).json({ error: 'Internal server error' });
    }
  }

  //Getting all jobs, getAll() is defined in jobModels
  async getAllJobs(req: Request, res: Response) {
    try {
      const jobs = await JobModel.getAll();
      return res.status(200).json(jobs);
    } catch (error) {
      console.error('Error fetching jobs:', error);
      return res.status(500).json({ error: 'Internal server error' });
    }
  }

  //Getting a job by id, getById() is defined in jobModels
  async getJobById(req: Request, res: Response) {
    try {
      const jobId = parseInt(req.params.id);
      if (isNaN(jobId)) {
        return res.status(400).json({ message: 'Invalid job ID' });
      }

      const job = await JobModel.getById(jobId);
      if (!job) {
        return res.status(404).json({ message: 'Job not found' });
      }

      return res.json(job);
    } catch (error) {
      console.error('Error fetching job by ID:', error);
      return res.status(500).json({ error: 'Internal server error' });
    }
  }

  //Updating a job by id
  async updateJob(req: Request, res: Response) {
    try {
      const jobId = parseInt(req.params.id);

      let logo: string | undefined;
      if (req.file) {
        const result = await cloudinary.uploader.upload(req.file.path);
        logo = result.secure_url;
      }
  
      const jobData = req.body;

      if (logo) {
        jobData.logo = logo;
      }
      const updatedJob = await prisma.job.update({
        where: { id: jobId },
        data: jobData,
      });
      if (!updatedJob) {
        return res.status(404).json({ message: 'Job not found' });
      }
  
      return res.status(200).json({ message: 'Job updated successfully', job: updatedJob });
    } catch (error) {
      console.error('Error updating job:', error);
      return res.status(500).json({ error: 'Internal server error' });
    }
  }
  
  //Deleting a job and it's details
  async deleteJob(req: Request, res: Response) {
    try {
      const jobId = parseInt(req.params.id);

      const job = await prisma.job.findUnique({where: { id: jobId }})
      if(!job){
        return res.status(404).json({message: "Job not found"});
      }

      await prisma.whatToDo.deleteMany({
        where: { jobId },
      });

      await prisma.requirement.deleteMany({
        where: { jobId },
      });

      await prisma.job.delete({where: { id: jobId }});
      return res.status(200).json({ message: 'Job deleted successfully'});

    } catch (error) {
      console.error('Error deleting job:', error);
      return res.status(500).json({ error: 'Internal server error' });
    }
  }

  //Adding job responsibilities by id
  async pushReqirments (req: Request, res:Response) {
    try{
      const jobId = parseInt(req.params.id);
      const {description, items} = req.body;

      const requirment = await prisma.requirement.create({data: {description,items,jobId}})
      return res.status(201).json({ message: 'Added requirement successfully', requirment });
      
    }catch(e){
      console.log("failed to add responsibility", e);
      return res.status(500).json({ error: 'Internal server error' });
    }
  }

  //Adding job responsibilities by id
  async pushResponsability (req: Request, res:Response) {
    try{
      const jobId = parseInt(req.params.id);

      const job = await prisma.job.findUnique({where: { id: jobId }})
      if(!job){
        return res.status(404).json({message: "Job not found"});
      }

      const {description, items} = req.body;

      const whatToDo = await prisma.whatToDo.create({data: {description,items,jobId}})
      return res.status(201).json({ message: 'Added role successfully', whatToDo });
      
    }catch(e){
      console.log("failed to add what to do / role", e);
      return res.status(500).json({ error: 'Internal server error' });
    }
  }

}

export default new JobController;
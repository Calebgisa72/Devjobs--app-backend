import { PrismaClient, Job } from '@prisma/client';

const prisma = new PrismaClient();

export class JobModel {
  
  static async getAll(): Promise<Job[]> {
    return await prisma.job.findMany({
      include: {
        requirements: true,
        whatToDo: true,
      },
    });
  }

  static async getById(id: number): Promise<Job | null> {
    return await prisma.job.findUnique({
      where: { id },
      include: {
        requirements: true,
        whatToDo: true,
      },
    });
  }
  
}

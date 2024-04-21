import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export interface Users {
    id: number;
    firstName: string;
    lastName: string;
    type: string;
    email: string;
    password: string;
    createdDate: Date;
}

export const UserModel = prisma.user;

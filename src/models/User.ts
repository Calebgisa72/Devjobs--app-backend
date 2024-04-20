import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export interface User {
    id: number;
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    createdDate: Date;
}

export const UserModel = prisma.user;

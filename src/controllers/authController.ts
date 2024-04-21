import { Request, Response } from 'express';
import bcrypt from 'bcrypt';
import { UserModel } from '../models/User';
import {generateToken} from '../services/authService';

function isValidEmail(email: string) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

export class AuthController {
    static async signup(req: Request, res: Response) {
        try {
            const { firstName, lastName,type , email, password, confirmPassword } = req.body;

            let checkEmail = isValidEmail(email);
            if(!checkEmail){
                res.status(400).json({error: 'Enter a valid email'});
                return;
            }
    
            if (password !== confirmPassword) {
                return res.status(400).json({ message: 'Passwords do not match' });
            }
    
            const existingUser = await UserModel.findUnique({ where: { email } });
            if (existingUser) {
                return res.status(400).json({ message: 'User already exists' });
            }
    
            const hashedPassword = await bcrypt.hash(password, 10);
    
            const user = await UserModel.create({
                data: {
                    firstName,
                    lastName,
                    email,
                    type,
                    password: hashedPassword,
                },
                select: {
                    id: true,
                    firstName: true,
                    lastName: true,
                    type: true,
                    email: true,
                    createdDate: true,
                },
            });
    
            return res.status(201).json({ message: 'User created successfully', data: user });
        } catch (error) {
            console.error('Error signing up:', error);
            return res.status(500).json({ error: 'Internal server error' });
        }
    }
    

    static async login(req: Request, res: Response) {
        try {
            const { email, password } = req.body;

            const user = await UserModel.findUnique({ where: { email } });
            if (!user) {
                return res.status(404).json({ message: 'User not found' });
            }

            const passwordMatch = await bcrypt.compare(password, user.password);
            if (!passwordMatch) {
                return res.status(401).json({ message: 'Invalid password' });
            }

            const token = generateToken({ userId: user.id });

            return res.status(200).json({ message: 'Signed in successfully', token });
        } catch (error) {
            console.error('Error logging in:', error);
            return res.status(500).json({ error: 'Internal server error' });
        }
    }
    static async getAllUsers(req: Request, res: Response) {
        try {
            const users = await UserModel.findMany({
                select: {
                    id: true,
                    firstName: true,
                    lastName: true,
                    type: true,
                    email: true,
                    createdDate: true,
                },
            });
            return res.status(200).json({data: users});
        } catch (error) {
            console.error('Error fetching users:', error);
            return res.status(500).json({ error: 'Internal server error' });
        }
    }
    

    static async getUserById(req: Request, res: Response) {
        try {
            const userId = parseInt(req.params.id);

            const user = await UserModel.findUnique({
                where: { id: userId },
                select: {
                    id: true,
                    firstName: true,
                    lastName: true,
                    type: true,
                    email: true,
                    createdDate: true,
                },
            });
            if (!user) {
                return res.status(404).json({ message: 'User not found' });
            }

            return res.json({data: user});
        } catch (error) {
            console.error('Error fetching user by ID:', error);
            return res.status(500).json({ error: 'Internal server error' });
        }
    }

}

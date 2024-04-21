import express from 'express';
import { Request, Response } from 'express';
import cors from 'cors';
import authRoutes from './routes/authRoutes';
import jobRoutes from './routes/jobRoutes';
import swaggerUi from 'swagger-ui-express';
import swaggerOutput from './documentation/swagger_output.json';

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerOutput));

app.get('/', (req: Request, res: Response) => {
    res.status(200).send('Welcome To Dev Jops API');
})

app.use('/api/auth', authRoutes
/*
#swagger.tags = ['User Authorization']
*/
);
app.use('/api', jobRoutes
/*
#swagger.tags = ['Jobs Controllers']
*/
);        

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});

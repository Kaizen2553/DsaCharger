import express from 'express';
import dotenv from 'dotenv';

import cookieParser from 'cookie-parser';
import {connectDb} from './src/lib/db.js';

import authRoutes from './src/routes/authRoutes.js';
import problemRoutes from './src/routes/problem.routes.js';

dotenv.config();
const app = express();

app.use(express.json());
app.use(cookieParser());

const PORT = process.env.PORT;

//verification nodemailer se hona chaiye
//todo:email se notification jana chahihye
app.use('/api/auth',authRoutes);
app.use('/api/problem',problemRoutes);

app.listen(PORT,()=>{
    connectDb();
    console.log('server is running on port 3000');
})
import express from 'express';
import dotenv from 'dotenv';

dotenv.config();
const app = express();

const PORT = process.env.PORT;

//verification nodemailer se hona chaiye
//todo:email se notification jana chahihye


app.listen(PORT,()=>{
    console.log('server is running on port 3000');
})
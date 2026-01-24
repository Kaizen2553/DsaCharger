import mongoose from 'mongoose'

export const connectDb = async() => {
    try{
        const conn = await mongoose.connect(process.env.MONGO_URI);
        console.log('mongodb connected',conn.connection.host);
    }catch(error){
        console.error('error connection to mongodb',error.message);
        exit(1);
    }
}
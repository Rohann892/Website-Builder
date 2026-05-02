import express from 'express';
import cookieParser from 'cookie-parser';
import authRouter from './routes/auth.route.js';
import userRouter from './routes/user.route.js'
import websiteRouter from './routes/website.route.js'
import cors from "cors"
import dotenv from 'dotenv'
import connectToDB from './config/db.js';
dotenv.config();


const app = express();

app.use(express.json());
app.use(cookieParser());
app.use(cors({
    origin: "http://localhost:5173",
    credentials: true,
    methods: ["GET", "POST"],
}));

const PORT = process.env.PORT || 5000;


app.use('/api/v1/auth', authRouter);
app.use('/api/v1/user', userRouter);
app.use('/api/v1/website', websiteRouter);


app.listen(PORT, () => {
    console.log(`✅ Server started at the port ${PORT}`)
    connectToDB();
})
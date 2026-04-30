import exprss from 'express';
import cookieParser from 'cookie-parser';
import authRouter from './routes/auth.route.js';
import cors from "cors"
import dotenv from 'dotenv'
import connectToDB from './config/db.js';
dotenv.config();


const app = exprss();

app.use(exprss.json());
app.use(exprss.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(cors({
    origin: "http://localhost:5173",
    credentials: true,
    methods: ["GET", "POST"],
}));

const PORT = process.env.PORT || 5000;


app.use('/api/v1/auth', authRouter);


app.listen(PORT, () => {
    console.log(`✅ Server started at the port ${PORT}`)
    connectToDB();
})
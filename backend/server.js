// common js

import express from 'express';
import connectDB from './config/db.js';
import chalk from 'chalk';

import userRouter from './routes/user.js';
import postRouter from './routes/post.js';
import cookieParser from 'cookie-parser';


const app = express();

app.use(express.json());
app.use(cookieParser())
app.use("/api/user", userRouter)
app.use("/api/post" , postRouter)



connectDB();

const PORT = 8000;
app.listen(PORT, () => {
    console.log(`${chalk.green.bold('server')} listening on ${PORT}`);
});
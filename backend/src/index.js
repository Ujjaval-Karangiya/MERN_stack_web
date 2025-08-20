import express from 'express';
import dotenv from 'dotenv';
import authRouter from './routes/auth.route.js';
import {connectDB} from './lib/db.js';
import cookieParser from "cookie-parser";
import messageRouter from './routes/message.route.js';


dotenv.config();

const app = express();
const port = process.env.PORT || 5000;


app.use("/api/auth", authRouter);
app.use("/api/message", messageRouter);
app.use(express.json());
app.use(cookieParser());

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}/api/auth/login`);
  connectDB();
});

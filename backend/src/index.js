import express from 'express';
import dotenv from 'dotenv';
import authRouter from './routes/auth.route.js';
import { connectDB } from './lib/db.js';
import cookieParser from "cookie-parser";
import cors from 'cors';
import messageRouter from './routes/message.route.js';

dotenv.config();

const app = express();
const port = process.env.PORT || 5000;

// ✅ CORS
app.use(cors({
  origin: "http://localhost:5173",
  credentials: true,
}));

// ✅ Middleware before routes
app.use(express.json());
app.use(cookieParser());

// ✅ Routers
app.use("/api/auth", authRouter);
app.use("/api/message", messageRouter);

// ------------------ Start Server ------------------
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
  connectDB();
});

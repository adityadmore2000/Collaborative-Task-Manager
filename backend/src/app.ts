import express from "express";
import cookieParser from "cookie-parser";
import authRoutes from "./modules/auth/auth.routes.js"
import cors from "cors";
import dotenv from "dotenv";
dotenv.config();


const app = express();
app.use(express.json());
app.use(cookieParser());
app.use(cors({
    origin:process.env.FRONTEND_URL,
    credentials:true
}))
app.use("/api/auth",authRoutes);

export default app;
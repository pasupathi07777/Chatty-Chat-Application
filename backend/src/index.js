import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import cors from "cors";
dotenv.config();
import { connectDB } from "./lib/db.js";
import authRoutes from "./routes/auth.route.js";
import messageRoutes from "./routes/message.route.js";

const PORT=process.env.PORT


const app=express()
app.use(express.json())
// app.use(cors())
app.use(cookieParser());
app.use(
    cors({
      origin: "http://localhost:5173",
      credentials: true,
    })
  );


app.use("/api/auth", authRoutes);
app.use("/api/messages", messageRoutes);




app.listen(PORT,()=>{
    console.log(`${PORT} Started`)
    connectDB()
})
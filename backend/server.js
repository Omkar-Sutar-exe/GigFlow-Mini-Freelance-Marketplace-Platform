import express from 'express';
import dotenv from "dotenv";
import cors from 'cors';
import cookieParser from 'cookie-parser';
import connectDB from "./config/db.js";
import authRoutes from "./routes/auth.route.js"
import protect from './middleware/auth.middleware.js';
import gigRoutes from './routes/gig.route.js'
import bidRoutes from './routes/bid.routes.js'


dotenv.config();

const app = express();
connectDB();

app.use(cors({
    origin: 'http://localhost:5173',
    credentials: true
}));
app.use(express.json());
app.use(cookieParser());

app.use("/api/auth", authRoutes);
app.use("/api/gigs",gigRoutes);
app.use("/api/bids",bidRoutes);

app.get("/",(req,res) => {
    res.send("Server is Running");
});

const PORT = process.env.port || 5000;

app.listen(PORT,() => {
    console.log(`server started at port ${PORT}`);
})


app.get("/api/protected",protect,(req,res) => {
    res.json({
        message:"You are authorized",
        user: req.user
    });
});


import express from "express";
import dotenv from 'dotenv'
import cors from 'cors'
import cookieParser from "cookie-parser"
import { connectDB } from "./config/db.js";

import userRoutes from "./routes/user.route.js"
import bookRoutes from "./routes/book.route.js"
import path from "path"


import {v2 as cloudinary}  from "cloudinary"


const __dirname = path.resolve();

 

dotenv.config()
cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.CLOUD_API_KEY,
    api_secret: process.env.CLOUD_SEC
})

const app = express()
const PORT = process.env.PORT || 5000;
console.log(process.env.MONGO_URL);

app.use(express.json({ limit: "20mb"}));
app.use(cors({
    origin: "http://localhost:5173",
    methods: "GET,POST,PUT,DELETE",
    credentials: true
}))
app.use(cookieParser());



app.use('/api/auth', userRoutes)
app.use('/api/books', bookRoutes)

if(process.env.NODE_ENV === 'production'){
    app.use.express.static(path.join(__dirname, "/frontend/dist"))

    app.get("*", (req,res)=> {
        res.sendFile(path.resolve(__dirname, "frontend", "dist", "index.html"))
    })

}


app.listen(PORT, async() => {
    await connectDB();
    console.log('Server is listening to:', PORT)
})
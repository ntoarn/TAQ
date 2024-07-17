import cors from 'cors'
import mongoose from 'mongoose';
import dotenv from 'dotenv'
import express from 'express';
import router from './routes/index.js';
const app = express()
dotenv.config();
const PORT = process.env.PORT
const URL_DB = process.env.URL_DB
mongoose.connect(URL_DB).then(() => {
    console.log(`Connect to ${URL_DB}`);
})
app.use(express.json());
app.use(express.urlencoded({ extended:true}))
app.use(cors())
app.use("/api", router)

app.listen(PORT, () => {
    console.log(`Server listening on ${PORT}`);
})
export const viteNodeApp = app;
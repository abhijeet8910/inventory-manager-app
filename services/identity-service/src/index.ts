import express  from "express";
import dotenv from "dotenv";

dotenv.config();
import {auth} from "./utils/auth";
import { toNodeHandler } from "better-auth/node";
import authRoutes from './routes/auth.routes';



const Port = process.env.PORT || 5500;

const app = express();
app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.all("api/auth/*splat", toNodeHandler(auth));
app.use('/api', authRoutes);




app.listen(Port, () => {
  console.log(`Identity Service running on port ${Port}...`);
});

//import modules
import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
import dotenv from "dotenv";

//import sub-routes
import generalRoutes from "./routes/general.js";
import clientRoutes from "./routes/client.js";
import managementRoutes from "./routes/management.js";
import salesRoutes from "./routes/sales.js";



//Configuration
dotenv.config();
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(helmet());
app.use(helmet.crossOriginResourcePolicy({ policy: 'cross-origin' }));
app.use(morgan('common'));
app.use(cors());

//ROUTES
app.use('/general', generalRoutes); //represents the dashboard homepage and user routes
app.use('/client', clientRoutes);
app.use('/management', managementRoutes);
app.use('/sales', salesRoutes);

//Connect to MongoDB
const PORT = process.env.PORT || 9000; //9000 is backup port number. should pull port number from .env file
mongoose.connect(process.env.MONGO_URL, //pulls mongoDB url from .env file
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  }).then(() => {
    app.listen(PORT, () => console.log(`Server running on port: ${PORT}`))
  }).catch((error) => console.log(error.message));
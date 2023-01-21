import express from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import helmet from 'helmet';
import morgan from 'morgan';

import clientRoutes from "./src/routes/client.js";
import generalRoutes from "./src/routes/general.js";
import managementRoutes from "./src/routes/management.js";
import salesRoutes from "./src/routes/sales.js";

/* Data Import */
import User from './src/models/User.js';
import Product from './src/models/Product.js';
import ProductStat from './src/models/ProductStat.js';
import Transaction from './src/models/Transaction.js';
import OverallStat from './src/models/OverallStat.js';
import AffiliateStat from './src/models/AffiliateStat.js';
import { dataUser, dataProduct, dataProductStat, dataTransaction, dataOverallStat, dataAffiliateStat } from "./src/data/index.js";

/* CONGIGURATON */
dotenv.config();
const app = express();
app.use(express.json());
app.use(helmet());
app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin" }));
app.use(morgan("common"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors());

/* ROUTES */
app.use("/client", clientRoutes);
app.use("/general", generalRoutes);
app.use("/management", managementRoutes);
app.use("/sales", salesRoutes);

/* mongodb u-akash p-akash */
/* MONGOOSE SETUP */

const PORT = process.env.PORT || 9000;

// mongoose.connect(process.env.MONGO_URL, {
//     useNewUrlParesr: true,
//     useUnifiedTopology: true,
// }).then(() => {
//     app.listen(PORT, () => console.log(`Server Port: ${PORT}`))
// }).catch((error) => console.log(`${error} didnot connect`))

mongoose.set("strictQuery", false);
mongoose
  .connect(process.env.MONGO_URL)
  .then(() => {
    app.listen(PORT, () => console.log(`Server Port: ${PORT}`));

    /* ONLY ADD ONE TIME */
    // User.insertMany(dataUser);
    // Product.insertMany(dataProduct);
    // ProductStat.insertMany(dataProductStat);
    // Transaction.insertMany(dataTransaction);
    // OverallStat.insertMany(dataOverallStat);
    // AffiliateStat.insertMany(dataAffiliateStat);
  })
  .catch((error) => console.log(`${error} didnot connect`));



  // https://www.youtube.com/watch?v=0cPCMIuDk2I&t=18s&ab_channel=EdRoh
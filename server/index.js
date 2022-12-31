import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import helmet from "helmet";
import morgan from "morgan";
import clientRoutes from "./routes/client.js";
import generalRoutes from "./routes/general.js";
import managementRoutes from "./routes/management.js";
import salesRoutes from "./routes/sales.js";

/* data imports */
import User from "./models/User.js";
import Product from "./models/Product.js";
import ProductStat from "./models/ProductStat.js";
import OverallStat from "./models/OverallStat.js";
import {
  dataUser,
  dataProduct,
  dataProductStat,
  dataTransaction,
  dataOverallStat,
  dataAffiliateStat,
} from "./data/index.js";
import Transaction from "./models/Transaction.js";
import AffiliateStat from "./models/AffiliateStat.js";

/* Config */
dotenv.config();

const app = express();
app.use(express.json());
app.use(helmet());
app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin" }));
app.use(morgan("common"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors());

/* Routes */

app.use("/client", clientRoutes);
app.use("/general", generalRoutes);
app.use("/management", managementRoutes);
app.use("/sales", salesRoutes);

/* Mongoose SETUP */
const PORT = process.env.PORT || 9000;
mongoose.set("strictQuery", true);
mongoose
  .connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    app.listen(PORT, () => console.log(`SERVER PORT ${PORT}`));

    /* ONLY USE ONE TIME FOR NOT DUPLICATE DATA */
    /*     Product.insertMany(dataProduct);
    User.insertMany(dataUser); */
    //Transaction.insertMany(dataTransaction);
    /*     OverallStat.insertMany(dataOverallStat);
    ProductStat.insertMany(dataProductStat); */
    /* AffiliateStat.insertMany(dataAffiliateStat); */
    //User.insertMany(dataUser);
  })
  .catch((error) => console.log(`${error} did not connect`));

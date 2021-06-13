import mongoose from "mongoose";
import cors from "cors";
import env from "dotenv";
import express from "express";
import { bookRouter } from "./src/routes/bookRoutes";
import { userRouter } from "./src/routes/userRoutes";
import { authorRouter } from "./src/routes/authorRoutes";
import {orderRouter} from "./src/routes/orderRoutes"
import {paymentRouter} from "./src/routes/paymentRoutes";
import {cartRouter} from "./src/routes/cartRoutes"

const configureEnvironment = () => {
  env.config();
};

async function connectToDatabase() {
  const connstr = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0.owya8.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority`;
  console.log("initializing DATABASE connection...");
  mongoose.connection.on("error", (err: any) =>
    console.log("mongoose error : ", err.message)
  );
  await mongoose.connect(connstr, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
  });
  console.log("Connected to DATABASE");
}

const startServer = async () => {
  configureEnvironment();
  await connectToDatabase();

  const app = express();
  app.use(cors());
  app.use(express.json());

  const server = app.listen(process.env.PORT);
  server.on("error", (error: any) =>
    console.log("server error : ", error.message)
  );
  app.use("/api/books", bookRouter);
  app.use("/api/user", userRouter);
  app.use("/api/author", authorRouter);
  app.use("/api/order",orderRouter);
  app.use("/api/cart",cartRouter);
  app.use("/api",paymentRouter);
};

startServer()
  .then(() => {
    console.log("server started on port " + process.env.PORT);
  })
  .catch((error: any) => {
    console.log("error on starting server : ", error.message);
  });

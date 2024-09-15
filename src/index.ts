import express from "express";
import dbConnection from "./db";
import setModels from "./models/models";
import cors from "cors";
import fileUpload from "express-fileupload";
import router from "./routers/index";
import errorHandlingMiddleware from "./middleware/ErrorHandlingMiddleware";
import path from "path";

import * as env from 'dotenv'



const start = async () => {
env.config();
const PORT = process.env.PORT || 5000;
const app = express();
app.use(cors());
app.use(express.json());
app.use(fileUpload({}));
app.use(express.static(path.resolve(__dirname, "static")));
app.use("/api", router);

//Обработка ошибок, последний Middleware
app.use(errorHandlingMiddleware);

  try {
    const sequelize = dbConnection()
    setModels(sequelize)
    await sequelize.authenticate();
    await sequelize.sync();

    app.listen(PORT, () => console.log("🚀Server started on port: " + PORT));
  } catch (e) {
    console.log(e);
  }
};

start();

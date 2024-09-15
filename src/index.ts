import express from 'express';
import dbConnection from './db';
import cors from 'cors';
import fileUpload from 'express-fileupload';
import { router } from './routes';
import { errorHandlingMiddleware } from './middlewares';
import path from 'path';

import * as env from 'dotenv';

env.config();

const start = async () => {
  const PORT = process.env.PORT || 5000;
  const app = express();
  app.use(cors());
  app.use(express.json());
  app.use(fileUpload({}));
  app.use(express.static(path.resolve(__dirname, 'static')));
  app.use('/api', router);

  //Обработка ошибок, последний Middleware
  app.use(errorHandlingMiddleware);

  try {
    const sequelize = dbConnection();
    await sequelize.authenticate();
    await sequelize.sync();

    app.listen(PORT, () => console.log('🚀Server started on port: ' + PORT));
  } catch (e) {
    console.log(e);
  }
};

start();

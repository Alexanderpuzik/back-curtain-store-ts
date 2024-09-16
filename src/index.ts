import express from 'express';
import { connectToDb } from './db';
import cors from 'cors';
import fileUpload from 'express-fileupload';
import { router } from './routes';
import { errorHandlingMiddleware } from './middlewares';
import path from 'path';
import dotenv from 'dotenv';

dotenv.config();

const start = async () => {
  const PORT = process.env.DB_PORT || 5000;
  const app = express();
  app.use(cors());
  app.use(express.json());
  app.use(fileUpload({}));
  app.use(express.static(path.resolve(__dirname, 'static')));
  app.use('/api', router);

  //Обработка ошибок, последний Middleware
  app.use(errorHandlingMiddleware);

  try {
    await connectToDb();

    app.listen(PORT, () => console.log('🚀Server started on port: ' + PORT));
  } catch (e) {
    console.log(e);
  }
};

start();

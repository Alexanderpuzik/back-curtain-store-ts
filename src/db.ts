import { Sequelize } from 'sequelize-typescript';
import dotenv from 'dotenv';
dotenv.config();

const getEnv = (name: string): string => {
  const value = process.env[name];
  if (!value) {
    throw new Error(`❌ Environment variable ${name} is not defined.`);
  }
  return value;
};

const dbName = getEnv('DB_NAME');
const dbUser = getEnv('DB_USER');
const dbPassword = getEnv('DB_PASSWORD');
const dbHost = getEnv('DB_HOST');
const dbPort = getEnv('DB_PORT');

const sequelize = new Sequelize({
  database: dbName,
  dialect: 'postgres',
  username: dbUser,
  password: dbPassword,
  host: dbHost,
  port: parseInt(dbPort),
  logging: false,
});

const connectToDb = async () => {
  try {
    await sequelize.authenticate();
    await sequelize.sync();
    console.log(
      '🚀 Connection to the database has been established successfully.'
    );
  } catch (error) {
    console.error('❌ Unable to connect to the database:', error);
  }
};

export { sequelize, connectToDb };

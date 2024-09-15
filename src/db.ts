import { Sequelize } from 'sequelize';

export default function dbConnection() {
  const dbName = process.env.DB_NAME;
  const user = process.env.DB_USER;
  const password = process.env.DB_PASSWORD;
  const host = process.env.DB_HOST;
  const port = process.env.DB_PORT;

  if (!dbName || !user || !password || !host || !port) {
    throw new Error('Not found ');
  }

  return new Sequelize(dbName, user, password, {
    dialect: 'postgres',
    host,
    port: parseInt(port),
  });
}

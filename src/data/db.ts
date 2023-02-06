import dotenv from 'dotenv';
import { Sequelize } from 'sequelize-typescript';

dotenv.config();

const {
  DB_URL = '',
  DB_NAME = '',
  DB_USERNAME = '',
  DB_PASSWORD = '',
  DB_PORT = '5432',
} = process.env;

export const db = new Sequelize(DB_NAME, DB_USERNAME, DB_PASSWORD, {
  dialect: 'postgres',
  host: DB_URL,
  port: Number(DB_PORT),
  models: [`${__dirname}/models`]
});


export async function connectToDB(sync: boolean = false): Promise<void> {
  try {

    if (sync) {
      await db.sync({ force: true  })
    }

    await db.authenticate();
    console.log('Connection has been established successfully.');
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
}

import * as dotenv from 'dotenv';
dotenv.config();

export const APP_PORT = +process.env.APP_PORT || 3000;
export const DB_URL = process.env.DB_URL;
export const DB_NAME = process.env.DB_NAME;

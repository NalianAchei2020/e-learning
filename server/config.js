import dotenv from 'dotenv';

dotenv.config();

export default {
  mongoDB_URL: process.env.mongoDB_URL,
  PORT: process.env.port,
  JWT_SECRET: process.env.JWT_SECRET,
};

import dotenv from 'dotenv';

dotenv.config(); // by calling this function, .env reads config.js and fells process

export default {
  PORT: process.env.PORT || 5000,
};
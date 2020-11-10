import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import config from './config.js';
import userRouter from './routers/userRouter.js';
import stockRouter from './routers/stockRouter.js'
import mysql from 'mysql';

export const db = mysql.createConnection({
    host : 'localhost',
    user: 'root',
    password: 'Kk052614..',
    database: 'Inventory_system'
  });
  
  db.connect((err) => {
    if (err) throw err;
    console.log('DB Connected!');
  });

const app = express();
// make connection between frontend and backend using sesstions and cookies
app.use(cors());
app.use(bodyParser.json());

app.use('/api/users', userRouter);
app.use('/api/stocks', stockRouter);

app.listen(config.PORT, () => {console.log(`Listening on http://localhost:${config.PORT}`)});
import express from 'express';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import config from './config.js';
import Authrouter from './routes/auth.js';
import usersRouter from './routes/user.js';

const app = express();

mongoose.set('strictQuery', false);

mongoose
  .connect(config.mongoDB_URL)
  .then(() => {
    console.log('Connected to MongoDB');
  })
  .catch((err) => {
    console.log(err);
  });

app.use(cors());
app.use(bodyParser.json());
app.use(express.json());

//cookie
app.use(cookieParser());

app.use((err, req, res, next) => {
  const errorStatus = err.status || 500;
  const errorMessage = err.message || 'Something went wrong';
  return res.status(errorStatus).json({
    success: false,
    status: errorStatus,
    message: errorMessage,
    stack: err.stack,
  });
});

app.use('/api/auth', Authrouter);
app.use('/api/users', usersRouter);

app.get('/', (req, res) => {
  res.send('Hello world');
});

//port
const port = config.PORT;
app.listen(port);
console.log(`Server is running on port ${port}`);

import { register, login } from '../controllers/auth.js';
import express from 'express';

const Authrouter = express.Router();

Authrouter.post('/register', register);
Authrouter.post('/login', login);

export default Authrouter;

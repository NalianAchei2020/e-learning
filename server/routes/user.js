import express, { Router } from 'express';
import {
  deleteUser,
  getallusers,
  getUsers,
  updateUsers,
} from '../controllers/users.js';
import {
  verifiedToken,
  verifyAdmin,
  verifyUser,
} from '../utils/verifyToken.js';

const usersRouter = express.Router();

//update
usersRouter.put('/:id', verifyUser, updateUsers);
//delete
usersRouter.delete('/:id', verifyUser, deleteUser);
//get
usersRouter.get('/:id', verifyUser, getUsers);
//get all
usersRouter.get('/', verifyAdmin, getallusers);

export default usersRouter;

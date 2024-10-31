import config from '../config.js';
import bcrypt from 'bcrypt';
import User from '../models/userModel.js';
import jwt from 'jsonwebtoken';
import { createError } from '../utils/error.js';

export const register = async (req, res, next) => {
  try {
    const { username, email, role, password } = req.body;

    // Check if user already exists
    const existingUser = await User.findOne({ username });
    if (existingUser) {
      res.status(409).send({ message: 'User already exist' });
    }

    // hash password
    const saltRound = 10;
    const salt = bcrypt.genSaltSync(saltRound);
    const hash = bcrypt.hashSync(password, salt);

    const user = new User({
      username,
      email,
      role,
      password: hash,
    });
    await user.save();
    res.status(200).send({ message: 'User created successfully' });
  } catch (err) {
    next(err);
  }
};
export const login = async (req, res, next) => {
  try {
    const user = await User.findOne({
      email: req.body.email,
    });
    if (!user) return next(createError(404, 'User not found!'));

    const isPasswordCurrent = await bcrypt.compare(
      req.body.password,
      user.password
    );
    if (!isPasswordCurrent)
      return next(createError(400, 'Wrong email or password!'));

    const token = jwt.sign(
      { id: user._id, isAdmin: user.isAdmin },
      config.JWT_SECRET
    );

    const { password, isAdmin, ...otherDetails } = user._doc;
    res
      .cookie('access_token', token, {
        httpOnly: true,
      })
      .status(200)
      .json({ ...otherDetails });
  } catch (err) {
    next(err);
  }
};

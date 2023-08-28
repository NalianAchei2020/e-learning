import config from '../config.js';
import { createError } from './error.js';
import jwt from 'jsonwebtoken';

export const verifiedToken = (req, res, next) => {
  const token = req.cookies && req.cookies.access_token;
  console.log(token);
  if (!token) {
    return next(createError(401, 'You are not authenticated'));
  }
  jwt.verify(token, config.JWT_SECRET, (err, user) => {
    if (err) return next(createError(401, 'Token is not valid'));
    req.user = user;
    next();
  });
};
export const verifyUser = (req, res, next) => {
  verifiedToken(req, res, (err) => {
    if (err) {
      return next(createError(401, 'You are not authorized'));
    }
    if (req.user.id === req.params.id || req.user.isAdmin) {
      next();
    } else {
      return next(createError(403, 'You are not authorized'));
    }
  });
};
export const verifyAdmin = (req, res, next) => {
  verifiedToken(req, res, (err) => {
    if (err) {
      return next(createError(401, 'You are not authorized'));
    }
    if (req.user.isAdmin) {
      next();
    } else {
      return next(createError(403, 'You are not authorized'));
    }
  });
};

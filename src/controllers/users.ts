import {NextFunction, Request, Response} from "express";
import bcrypt from 'bcrypt';
import User from "../models/user";
import {
  BAD_REQUEST_ERROR_CODE,
  CREATE_STATUS_CODE,
  NOT_FOUND_ERROR_CODE,
  OK_STATUS_CODE,
  SERVER_ERROR_CODE, SERVER_ERROR_MESSAGE
} from "../consts";
import NotFoundError from "../errors/NotFoundError";
import ServerError from "../errors/ServerError";
import BadRequestError from "../errors/BadRequestError";
import UnauthorizedError from "../errors/UnauthorizedError";

export const getUsers = (req: Request, res: Response, next: NextFunction) => User.find({})
  .orFail()
  .then(users => {
    if (!users) {
      throw new NotFoundError();
    }

    res.send(users)
  })
  .catch(next);

export const getUserById = (req: Request, res: Response, next: NextFunction) => User.findOne({
  id: req.query.id
})
  .orFail()
  .then(user => {
    if (!user) {
      throw new NotFoundError();
    }

    res.send(user)
  })
  .catch((err) => {
    if (err.name === 'CastError') {
      return new BadRequestError()
    }

    return next(err);
  });

export const createUser = (req: Request, res: Response, next: NextFunction) => User.create({
  name: req.query.name,
  about: req.query.about,
  avatar: req.query.avatar,
})
  .then((user) => res.status(CREATE_STATUS_CODE).send(user))
  .catch((err) => {
    if (err.name === 'ValidationError') {
      return next(new BadRequestError());
    }

    return next(err)
  });

export const updateUser = (req: Request, res: Response, next: NextFunction) => User.findOneAndUpdate({
  id: req.query.id
}, {
  name: req.query.name,
  about: req.query.about,
}, { new: true, runValidators: true })
  .orFail()
  .then((user) => {
    if (!user) {
      throw new NotFoundError()
    }

    res.send(user)
  })
  .catch((err) => {
    if (err.name === 'ValidationError') {
      return next(new BadRequestError());
    }

    return next(err)
  });

export const updateAvatar = (req: Request, res: Response, next: NextFunction) => User.findOneAndUpdate({
  id: req.query.id
}, { avatar: req.query.avatar }, { new: true, runValidators: true })
  .orFail()
  .then((user) => {
    if (!user) {
      throw new NotFoundError();
    }

    res.send(user)
  })
  .catch((err) => {
    if (err.name === 'ValidationError') {
      return next(new BadRequestError());
    }

    return next(err);
  });

export const login = (req: Request, res: Response, next: NextFunction) => {
  const { email, password } = req.body;

  return User.findOne({ email })
    .then((user) => {
      if (!user) {
        return Promise.reject(new UnauthorizedError('Неправильные почта или пароль'));
      }

      return bcrypt.compare(password, user.password);
    })
    .then((matched) => {
      if (!matched) {
        return Promise.reject(new UnauthorizedError('Неправильные почта или пароль'));
      }

      res.send({ message: 'Всё верно!' });
    })
    .catch(next);
};

export const getCurrentUser = (
  req: Request,
  res: Response,
  next: NextFunction
) => User.findById(req.user?._id)
  .then((user) => {
    if (!user) {
      throw new NotFoundError();
    }

    res.status(OK_STATUS_CODE).send(user)
  })
  .catch((err) => {
    if (err.name === 'ValidationError') {
      return next(new BadRequestError());
    }

    return next(err);
  });
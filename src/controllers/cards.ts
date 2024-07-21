import {NextFunction, Request, Response} from "express";
import Card from "../models/card";
import {
  BAD_REQUEST_ERROR_CODE,
  CREATE_STATUS_CODE,
  NOT_FOUND_ERROR_CODE,
  OK_STATUS_CODE,
  SERVER_ERROR_CODE, SERVER_ERROR_MESSAGE
} from "../consts";
import NotFoundError from "../errors/NotFoundError";
import BadRequestError from "../errors/BadRequestError";

export const getCards = (req: Request, res: Response, next: NextFunction) => Card.find({})
  .orFail()
  .then(cards => {
    if (!cards) {
      throw new NotFoundError();
    }

    res.send(cards)
  })
  .catch(next);

export const getCardById = (req: Request, res: Response, next: NextFunction) => Card.findOne({
  id: req.query.id
})
  .orFail()
  .then(card => {
    if (!card) {
      throw new NotFoundError();
    }

    res.send(card)
  })
  .catch((err) => {
    if (err.name === 'CastError') {
      return next(new BadRequestError());
    }

    return next(err);
  });

export const createCard = (req: Request, res: Response, next: NextFunction) => Card.create({
  name: req.query.name,
  link: req.query.link,
  owner: req.user.id,
})
  .then((card) => res.status(CREATE_STATUS_CODE).send(card))
  .catch((err) => {
    if (err.name === 'ValidationError') {
      return next(new BadRequestError());
    }

    return next(err);
  });

export const likeCard = (req: Request, res: Response, next: NextFunction) => Card.findByIdAndUpdate(
  req.params.cardId,
  { $addToSet: { likes: req.user._id } }, // добавить _id в массив, если его там нет
  { new: true },
)
  .orFail()
  .then((like) => {
    if (!like) {
      throw new NotFoundError();
    }

    res.status(OK_STATUS_CODE).send(like)
  })
  .catch((err) => {
    if (err.name === 'ValidationError') {
      return next(new BadRequestError());
    }

    return next(err);
  });

export const dislikeCard = (req: Request, res: Response, next: NextFunction) => Card.findByIdAndUpdate(
  req.params.cardId,
  { $pull: { likes: req.user._id } }, // убрать _id из массива
  { new: true },
)
  .orFail()
  .then((like) => {
    if (!like) {
      throw new NotFoundError();
    }

    res.status(OK_STATUS_CODE).send(like)
  })
  .catch((err) => {
    if (err.name === 'ValidationError') {
      return next(new BadRequestError());
    }

    return next(err);
  });

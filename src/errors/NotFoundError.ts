import {NOT_FOUND_ERROR_CODE} from "../consts";

export default class NotFoundError extends Error {
  constructor(message: string = 'Ничего не найдено') {
    super(message);
    this.statusCode = 404;
  }
}
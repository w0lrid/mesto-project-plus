import {NOT_FOUND_ERROR_CODE} from "../consts";

export default class NotFoundError extends Error {
  statusCode: number;
  constructor(message: string = 'Ничего не найдено') {
    super(message);
    this.statusCode = 404;
  }
}
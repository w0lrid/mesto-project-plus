import {SERVER_ERROR_MESSAGE} from "../consts";

export default class ServerError extends Error {
  constructor(message: string = SERVER_ERROR_MESSAGE) {
    super(message);
    this.statusCode = 500;
  }
}
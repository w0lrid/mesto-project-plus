import {SERVER_ERROR_MESSAGE} from "../consts";

export default class ServerError extends Error {
  statusCode: number;
  constructor(message: string = SERVER_ERROR_MESSAGE) {
    super(message);
    this.statusCode = 500;
  }
}
export default class BadRequestError extends Error {
  statusCode: number;
  constructor(message: string = 'Ошибка запроса') {
    super(message);
    this.statusCode = 400;
  }
}
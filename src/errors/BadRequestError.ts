export default class BadRequestError extends Error {
  constructor(message: string = 'Ошибка запроса') {
    super(message);
    this.statusCode = 400;
  }
}
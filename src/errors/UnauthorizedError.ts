export default class UnauthorizedError extends Error {
  constructor(message: string = 'Пользователь не авторизован') {
    super(message);
    this.statusCode = 401;
  }
}
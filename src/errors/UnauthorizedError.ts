export default class UnauthorizedError extends Error {
  statusCode: number;
  constructor(message: string = 'Пользователь не авторизован') {
    super(message);
    this.statusCode = 401;
  }
}
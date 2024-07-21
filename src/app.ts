import express, {NextFunction, Request, Response} from 'express';
import users from "./routes/users";
import mongoose from "mongoose";
import cards from "./routes/cards";
import {createUser, login} from "./controllers/users";
import auth from "./middlewares/auth";
import {NOT_FOUND_ERROR_CODE, SERVER_ERROR_MESSAGE} from "./consts";
import {createUserValidation} from "./validations/validations";

const { PORT = 3000 } = process.env;
const app = express();
mongoose.connect('mongodb://localhost:27017/mestodb');

app.get('/crash-test', () => {
  setTimeout(() => {
    throw new Error('Сервер сейчас упадёт');
  }, 0);
});

app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  const { statusCode = 500, message } = err;

  res
    .status(statusCode)
    .send({
      message: statusCode === 500
        ? SERVER_ERROR_MESSAGE
        : message
    });

  next();
});
app.post('/signin', login);
app.post('/signup', createUserValidation, createUser);
app.use(auth);
app.use('/', users);
app.use('/', cards);
app.use('*', (req: Request, res: Response) => {
  res.status(NOT_FOUND_ERROR_CODE).send();
})

app.listen(+PORT, () => {
  console.log(`App listening on port ${PORT}`);
});
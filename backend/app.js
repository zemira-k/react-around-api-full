const express = require('express');
const { errors } = require('celebrate');
const app = express();
const { PORT = 3000 } = process.env;
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const { celebrate, Joi } = require('celebrate');
const helmet = require('helmet');
const { requestLogger, errorLogger } = require('./middleware/logger');

const { login, createUser } = require('./controllers/users');
const auth = require('./middleware/auth');

const cards = require('./routes/cards'); // importing router

const users = require('./routes/users'); // importing router

app.use(helmet());
app.use(cors());
app.options('*', cors());

mongoose.connect('mongodb://localhost:27017/aroundb', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(requestLogger);

app.post(
  '/signin',
  celebrate({
    body: Joi.object().keys({
      email: Joi.string().required().email(),
      password: Joi.string().required().alphanum(),
    }),
  }),
  login
);

app.post(
  '/signup',
  celebrate({
    body: Joi.object().keys({
      email: Joi.string().required().email(),
      password: Joi.string().required().alphanum(),
    }),
  }),
  createUser
);

// app.post('/signin', login);
// app.post('/signup', createUser);

app.use(auth);

app.use('/', cards); // starting cards router
app.use('/', users); // starting users router
app.get('*', (req, res) => {
  res.status(404).send({ message: 'Requested resource not found' });
});

app.use(errorLogger);

app.use(errors());

app.use((err, req, res, next) => {
  console.log('name', err.name, 'message', err.message);
  const { statusCode = 500, message } = err;

  res.status(statusCode).send({
    message: statusCode === 500 ? 'An error occurred on the server' : message,
  });
});

app.listen(PORT);

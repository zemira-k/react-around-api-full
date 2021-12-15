const express = require('express');

const app = express();
const { PORT = 3000 } = process.env;
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const helmet = require('helmet');

const { login, createUser } = require('./controllers/users');
const auth = require('./middleware/auth');

const cards = require('./routes/cards'); // importing router

const users = require('./routes/users'); // importing router

app.use(helmet());

mongoose.connect('mongodb://localhost:27017/aroundb', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.post('/signin', login);
app.post('/signup', createUser);

app.use(auth);

app.use('/', cards); // starting cards router
app.use('/', users); // starting users router
app.get('*', (req, res) => {
  res.status(404).send({ message: 'Requested resource not found' });
});

app.listen(PORT);

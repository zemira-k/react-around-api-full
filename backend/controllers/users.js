const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/user');
const NotFoundError = require('../errors/not-found-err');
const ConflictError = require('../errors/conflict-err');
const BadReqError = require('../errors/bad-req-err');

const costumErrorCatch = (err, res) => {
  if (err.name === 'CastError') {
    res.status(400).send({ message: 'Invalid user id' });
  } else if (err.statusCode === 404) {
    res.status(404).send({ message: err.message });
  } else {
    res.status(500).send({ message: err.message || 'internal server error' });
  }
  next();
};

const test = (req, res) => {
  res.send(req.user);
};

const getAllUsers = (req, res, next) => {
  User.find({})
    .then((users) => {
      res.status(200).send(users);
    })
    .catch(next);
};

const getUser = (req, res, next) => {
  User.findById(req.user._id)
    .then((user) => {
      if (user) {
        res.status(200).send({ data: user });
      } else {
        throw new NotFoundError('user not found');
      }
    })
    .catch(next);
};

const login = (req, res, next) => {
  const { email, password } = req.body;
  return User.findUserByCredentials(email, password)
    .then((user) => {
      const token = jwt.sign({ _id: user._id }, 'super-strong-secret', {
        expiresIn: '7d',
      });
      res.send({ token });
    })
    .catch(next);
};

const createUser = (req, res, next) => {
  const { email, password } = req.body;
  bcrypt
    .hash(password, 10)
    .then((hash) =>
      User.create({
        email,
        password: hash, // adding the hash to the database
      })
    )
    .then((user) => res.send({ data: user }))
    .catch((err) => {
      if (err.name === 'MongoServerError') {
        throw new ConflictError('server not responding, please try again');
      } else if (err.name === 'ValidationError') {
        throw new BadReqError('email and password required');
      }
    })
    .catch(next);
};

const updateProfile = (req, res) => {
  const { name, about } = req.body;
  User.findByIdAndUpdate(
    req.user._id,
    { name, about },
    {
      new: true, // the then handler receives the updated entry as input
      runValidators: true, // the data will be validated before the update
      upsert: false, // if the user entry wasn't found, it will be created
    }
  )
    .orFail(() => {
      const error = new Error('user not found');
      error.statusCode = 404;
      throw error;
    })
    .then((user) => res.send({ data: user }))
    .catch((err) => {
      costumErrorCatch(err, res);
    });
};

const updateAvatar = (req, res) => {
  const { avatar } = req.body;
  User.findByIdAndUpdate(
    req.user._id,
    {
      avatar,
    },
    {
      new: true, // the then handler receives the updated entry as input
      runValidators: true, // the data will be validated before the update
      upsert: false, // if the user entry wasn't found, it will be created
    }
  )
    .orFail(() => {
      const error = new Error('user not found');
      error.statusCode = 404;
      throw error;
    })
    .then((user) => res.send({ data: user }))
    .catch((err) => {
      costumErrorCatch(err, res);
    });
};

module.exports = {
  getAllUsers,
  getUser,
  createUser,
  updateProfile,
  updateAvatar,
  login,
  test,
};

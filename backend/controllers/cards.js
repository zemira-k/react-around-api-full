const Card = require('../models/card');
const NotFoundError = require('../errors/not-found-err');
const BadReqError = require('../errors/bad-req-err');
const ForbiddenError = require('../errors/forbidden-err');

const getAllCards = (req, res, next) => {
  Card.find({})
    .then((cards) => {
      res.status(200).send(cards);
    })
    .catch(next);
};

const createCard = (req, res, next) => {
  const { name, link } = req.body;
  Card.create({ name, link, owner: req.user._id })
    .then((card) => res.status(201).send({ data: card }))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        throw new BadReqError('all inputs required');
      }
    })
    .catch(next);
};

const deleteCard = (req, res, next) => {
  Card.findById(req.params.id)
    .orFail(() => {
      throw new NotFoundError('card not found');
    })
    .then((card) => {
      if (req.user._id.toString() === card.owner.toString()) {
        Card.findByIdAndRemove(req.params.id).then((card) => {
          res.status(200).send({ data: card });
        });
      } else if (req.user._id.toString() !== card.owner.toString()) {
        throw new ForbiddenError('can not delete card of other user');
      } else if (err.name === 'CastError') {
        throw new BadReqError('Invalid card id');
      }
    })
    .catch(next);
};

const likeCard = (req, res, next) => {
  Card.findByIdAndUpdate(
    req.params.id,
    { $addToSet: { likes: req.user._id } }, // add _id to the array if it's not there yet
    { new: true }
  )
    .orFail(() => {
      throw new NotFoundError('card not found');
    })
    .then((card) => {
      res.status(200).send({ data: card });
      if (err.name === 'CastError') {
        throw new BadReqError('Invalid card id');
      }
    })
    .catch(next);
};

const unlikeCard = (req, res, next) => {
  Card.findByIdAndUpdate(
    req.params.id,
    { $pull: { likes: req.user._id } }, // remove _id from the array
    { new: true }
  )
    .orFail(() => {
      throw new NotFoundError('card not found');
    })
    .then((card) => {
      res.status(200).send({ data: card });
      if (err.name === 'CastError') {
        throw new BadReqError('Invalid card id');
      }
    })
    .catch(next);
};

module.exports = {
  getAllCards,
  createCard,
  deleteCard,
  likeCard,
  unlikeCard,
};

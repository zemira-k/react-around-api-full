const Card = require('../models/card');

const costumErrorCatch = (err, res) => {
  if (err.name === 'CastError') {
    res.status(400).send({ message: 'Invalid card id' });
  } else if (err.statusCode === 404) {
    res.status(404).send({ message: err.message });
  } else {
    res.status(500).send({ message: err.message || 'internal server error' });
  }
};

const getAllCards = (req, res) => {
  Card.find({})
    .then((cards) => {
      res.status(200).send(cards);
    })
    .catch((err) => {
      res.status(500).send({ message: err.message || 'internal server error' });
    });
};

const createCard = (req, res) => {
  const { name, link } = req.body;
  Card.create({ name, link, owner: req.user._id })
    .then((card) => res.send({ data: card }))
    .catch((err) => {
      if (err.name === 'CastError') {
        res.status(400).send({ message: 'Invalid card id' });
      } else {
        res
          .status(500)
          .send({ message: err.message || 'internal server error' });
      }
    });
};

const deleteCard = (req, res) => {
  Card.findByIdAndRemove(req.params.id)
    .orFail(() => {
      const error = new Error('card not found');
      error.statusCode = 404;
      throw error;
    })
    .then((card) => {
      res.status(200).send(card);
    })
    .catch((err) => {
      costumErrorCatch(err, res);
    });
};

const likeCard = (req, res) => {
  Card.findByIdAndUpdate(
    req.params.id,
    { $addToSet: { likes: req.user._id } }, // add _id to the array if it's not there yet
    { new: true },
  )
    .orFail(() => {
      const error = new Error('card not found');
      error.statusCode = 404;
      throw error;
    })
    .then((card) => res.send({ data: card }))
    .catch((err) => {
      costumErrorCatch(err, res);
    });
};

const unlikeCard = (req, res) => {
  Card.findByIdAndUpdate(
    req.params.id,
    { $pull: { likes: req.user._id } }, // remove _id from the array
    { new: true },
  )
    .orFail(() => {
      const error = new Error('card not found');
      error.statusCode = 404;
      throw error;
    })
    .then((card) => {
      res.status(200).send(card);
    })
    .catch((err) => {
      costumErrorCatch(err, res);
    });
};

module.exports = {
  getAllCards,
  createCard,
  deleteCard,
  likeCard,
  unlikeCard,
};

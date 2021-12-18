const router = require('express').Router(); // creating a router
const { celebrate, Joi } = require('celebrate');
const {
  getAllCards,
  createCard,
  deleteCard,
  likeCard,
  unlikeCard,
} = require('../controllers/cards');

// function validateUrl(string) {
//   return validator.isURL(string);
// }

router.post(
  '/cards',
  celebrate({
    headers: Joi.object()
      .keys({
        authorization: Joi.string().required(),
      })
      .unknown(true),
    body: Joi.object().keys({
      name: Joi.string().required().min(2).max(30),
      link: Joi.string().required().uri(),
    }),
  }),
  createCard
);

router.delete(
  '/cards/:id',
  celebrate({
    params: Joi.object().keys({
      id: Joi.string().length(24).alphanum().required(),
    }),
    headers: Joi.object()
      .keys({
        authorization: Joi.string().required(),
      })
      .unknown(true),
  }),
  deleteCard
);

router.put(
  '/cards/:id/likes',
  celebrate({
    params: Joi.object().keys({
      id: Joi.string().length(24).alphanum().required(),
    }),
    headers: Joi.object()
      .keys({
        authorization: Joi.string().required(),
      })
      .unknown(true),
  }),
  likeCard
);

router.delete(
  '/cards/:id/likes',
  celebrate({
    params: Joi.object().keys({
      id: Joi.string().length(24).alphanum().required(),
    }),
    headers: Joi.object()
      .keys({
        authorization: Joi.string().required(),
      })
      .unknown(true),
  }),
  unlikeCard
);

// Joi.string().pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')),

router.get('/cards', getAllCards);
// router.post('/cards', createCard);
// router.delete('/cards/:id', deleteCard);
// router.put('/cards/:id/likes', likeCard);
// router.delete('/cards/:id/likes', unlikeCard);

module.exports = router; // exporting the router

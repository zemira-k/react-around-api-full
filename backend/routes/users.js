const router = require('express').Router(); // creating a router
const { celebrate, Joi } = require('celebrate');
const {
  getAllUsers,
  getUser,
  updateProfile,
  updateAvatar,
} = require('../controllers/users');

// function validateUrl(string) {
//   return validator.isURL(string);
// }

router.get(
  '/users/me',
  celebrate({
    headers: Joi.object()
      .keys({
        authorization: Joi.string().required(),
      })
      .unknown(true),
  }),
  getUser
);

router.patch(
  '/users/me',
  celebrate({
    headers: Joi.object()
      .keys({
        authorization: Joi.string().required(),
      })
      .unknown(true),
    body: Joi.object().keys({
      name: Joi.string().required().min(2).max(30),
      about: Joi.string().required().min(2).max(30),
    }),
  }),
  updateProfile
);

router.patch(
  '/users/me/avatar',
  celebrate({
    headers: Joi.object()
      .keys({
        authorization: Joi.string().required(),
      })
      .unknown(true),
    body: Joi.object().keys({
      avatar: Joi.string().required().uri(),
    }),
  }),
  updateAvatar
);

router.get('/users', getAllUsers);
// router.get('/users/me', getUser);
// router.patch('/users/me', updateProfile);
// router.patch('/users/me/avatar', updateAvatar);

module.exports = router; // exporting the router

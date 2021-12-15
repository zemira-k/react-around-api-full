const router = require('express').Router(); // creating a router

const {
  getAllUsers,
  getUser,
  updateProfile,
  updateAvatar,
  test,
} = require('../controllers/users');

router.get('/users', getAllUsers);
router.get('/users/test', test);
// router.get('/users/:id', getUser);
router.get('/users/me', getUser);
router.patch('/users/me', updateProfile);
router.patch('/users/me/avatar', updateAvatar);

module.exports = router; // exporting the router

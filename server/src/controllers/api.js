const router = require('express').Router();

const sessionController = require('./session');
const postController = require('./posts');
const postV1Controller = require('./posts_v1');
const userController = require('./users');
const profileController = require('./profile');

router.use('/session', sessionController);
router.use('/users', userController);
router.use('/posts/v1', postV1Controller);
router.use('/posts', postController);
router.use('/profile', profileController);

module.exports = router;
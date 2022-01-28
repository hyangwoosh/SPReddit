const router = require('express').Router();

const sessionController = require('./session');
const postController = require('./posts');
const userController = require('./users');

router.use('/session', sessionController);
router.use('/users', userController);
router.use('/posts', postController);

module.exports = router;

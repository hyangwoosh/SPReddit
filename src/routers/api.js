const router = require('express').Router();
const postsRouter = require('./posts');
const usersRouter = require('./users')
const profileRouter = require('./profile');


router.use('/posts', postsRouter);
router.use('/users', usersRouter);
router.use('/profile', profileRouter);
module.exports = router;
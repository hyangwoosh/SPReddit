const router = require('express').Router();
const postsRouter = require('./posts');
<<<<<<< HEAD
const usersRouter = require('./users')
const profileRouter = require('./profile');


router.use('/posts', postsRouter);
router.use('/users', usersRouter);
=======
const profileRouter = require('./profile');

router.use('/posts', postsRouter);
>>>>>>> 75b4a98 (Jerald - Get user profile)
router.use('/profile', profileRouter);
module.exports = router;
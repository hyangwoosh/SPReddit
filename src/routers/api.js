const router = require('express').Router();
const postsRouter = require('./posts');
<<<<<<< HEAD
<<<<<<< HEAD
const usersRouter = require('./users')
=======
const usersRouter = require('./users');
>>>>>>> 73b5445 (Likes feature (Unfinished))
const profileRouter = require('./profile');


router.use('/posts', postsRouter);
router.use('/users', usersRouter);
=======
const profileRouter = require('./profile');

router.use('/posts', postsRouter);
>>>>>>> 75b4a98 (Jerald - Get user profile)
router.use('/profile', profileRouter);
module.exports = router;

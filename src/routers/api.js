const router = require('express').Router();
const postsRouter = require('./posts');
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
const usersRouter = require('./users')
=======
const usersRouter = require('./users');
>>>>>>> 73b5445 (Likes feature (Unfinished))
=======
const usersRouter = require('./users');
>>>>>>> 5aee464 (Revert "Merge branch 'main' of https://github.com/LiauYanBin/SPReddit_YanBin into main")
const profileRouter = require('./profile');


router.use('/posts', postsRouter);
router.use('/users', usersRouter);
<<<<<<< HEAD
=======
const profileRouter = require('./profile');

router.use('/posts', postsRouter);
>>>>>>> 75b4a98 (Jerald - Get user profile)
=======
>>>>>>> 5aee464 (Revert "Merge branch 'main' of https://github.com/LiauYanBin/SPReddit_YanBin into main")
router.use('/profile', profileRouter);
module.exports = router;
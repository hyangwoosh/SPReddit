const router = require('express').Router();
const postsRouter = require('./posts');

router.use('/posts', postsRouter);
module.exports = router;
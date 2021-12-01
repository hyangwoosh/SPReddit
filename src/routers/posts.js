const router = require('express').Router();
const connection = require('../database/database');

// Create post
router.post('/', function (req, res) {
  var creator = req.body.creator;
  var title = req.body.title;
  var content = req.body.content;

  const addPostQuery = {
    text: 'INSERT INTO posts (creator,title,content) VALUES ($1,$2,$3);',
    values: [creator, title, content],
  };

  connection.query(addPostQuery, function (error, result) {
    if (error) {
      // console.log(error);
      res.status(400).json({
        error: 'Error while adding post'
      });
    } else {
      // console.log(result);
      res.status(200).json({
        message: `Added post successfully`
      });
    }
  });
});

// Retrieve all posts
router.get('/', function (req, res) {

  const getPostsQuery = {
    text: 'SELECT * FROM posts;',
  };

  connection.query(getPostsQuery, function (error, result) {
    if (error) {
      // console.log(error);
      res.status(500).json({
        error: 'Error while retrieving posts'
      });
    } else {
      if (result) {
        // console.log(result);
        res.status(200).json({
          message: 'Retrieved posts successfully',
          result: result.rows
        });
      } else {
        // console.log(error);
        res.status(404).json({
          error: `Posts not found`
        });
      }
    }
  });
});

// Retrieve post by ID
router.get('/:postID', function (req, res) {
  var postID = req.params.postID;

  const getPostByIDQuery = {
    text: 'SELECT * FROM posts WHERE post_id=$1;',
    values: [postID],
  };

  connection.query(getPostByIDQuery, function (error, result) {
    if (error) {
      // console.log(error);
      res.status(500).json({
        error: 'Error while retrieving post'
      });
    } else {

      if (result.rowCount === 1) {
        // console.log(result);
        res.status(200).json({
          message: 'Retrieved post successfully',
          result: result.rows
        });
      } else {
        // console.log(error);
        res.status(404).json({
          error: `Post not found`
        });
      }
    }
  });
});

// Update post
router.put('/:postID', function (req, res) {
  var postID = req.params.postID;
  var title = req.body.title;
  var content = req.body.content;
  var updated_at = new Date();

  const updatePostQuery = {
    text: 'UPDATE posts SET title=$1,content=$2,updated_at=$3 WHERE post_id=$4;',
    values: [title, content, updated_at, postID],
  };

  connection.query(updatePostQuery, function (error, result) {
    if (error) {
      // console.log(error);
      res.status(500).json({
        error: 'Error while updating post'
      });
    } else {
      // console.log(result);
      if (result.rowCount === 1) {
        res.status(200).json({
          message: 'Updated post successfully'
        });
      } else {
        // console.log(error);
        res.status(404).json({
          error: `Post not found`
        });
      }
    }
  });
});

// Delete post
router.delete('/:postID', function (req, res) {
  var postID = req.params.postID;

  const deletePostQuery = {
    text: 'DELETE FROM posts WHERE post_id=$1;',
    values: [postID],
  };

  connection.query(deletePostQuery, function (error, result) {
    if (error) {
      // console.log(error);
      res.status(400).json({
        error: 'Error while deleting post'
      });
    } else {
      if (result.rowCount === 1) {
        // console.log(result);
        res.status(200).json({
          message: 'Deleted post successfully'
        });
      } else {
        // console.log(error);
        res.status(404).json({
          error: `Post not found`
        });
      }
    }
  });
});

// Create comment
router.post('/comments', function (req, res) {
  var post_id = req.body.post_id;
  var creator = req.body.creator;
  var content = req.body.content;

  const addCommentQuery = {
    text: 'INSERT INTO post_comments (post_id,creator,content) VALUES ($1,$2,$3);',
    values: [post_id, creator, content],
  };

  connection.query(addCommentQuery, function (error, result) {
    if (error) {
      // console.log(error);
      res.status(400).json({
        error: 'Error while adding comment'
      });
    } else {
      // console.log(result);
      res.status(200).json({
        message: `Added comment successfully`
      });
    }
  });
});

// Retrieve all comments from a specific post
router.get('/comments/posts/:postID', function (req, res) {
  var postID = req.params.postID;

  const getCommentsQuery = {
    text: 'SELECT * FROM post_comments WHERE post_id=$1;',
    values: [postID],
  };

  connection.query(getCommentsQuery, function (error, result) {
    if (error) {
      // console.log(error);
      res.status(500).json({
        error: 'Error while retrieving comments'
      });
    } else {
      if (result) {
        // console.log(result);
        res.status(200).json({
          message: 'Retrieved comments successfully',
          result: result.rows
        });
      } else {
        // console.log(error);
        res.status(404).json({
          error: `Comments not found`
        });
      }
    }
  });
});

// Retrieve comment by ID
router.get('/comments/:commentID', function (req, res) {
  var commentID = req.params.commentID;

  const getCommentByIDQuery = {
    text: 'SELECT * FROM post_comments WHERE comment_id=$1;',
    values: [commentID],
  };

  connection.query(getCommentByIDQuery, function (error, result) {
    if (error) {
      // console.log(error);
      res.status(500).json({
        error: 'Error while retrieving comment'
      });
    } else {

      if (result.rowCount === 1) {
        // console.log(result);
        res.status(200).json({
          message: 'Retrieved comment successfully',
          result: result.rows
        });
      } else {
        // console.log(error);
        res.status(404).json({
          error: `Comment not found`
        });
      }
    }
  });
});

// Update comment
router.put('/comments/:commentID', function (req, res) {
  var commentID = req.params.commentID;
  var content = req.body.content;

  const updateCommentQuery = {
    text: 'UPDATE post_comments SET content=$1 WHERE comment_id=$2;',
    values: [content, commentID],
  };

  connection.query(updateCommentQuery, function (error, result) {
    if (error) {
      // console.log(error);
      res.status(500).json({
        error: 'Error while updating comment'
      });
    } else {
      // console.log(result);
      if (result.rowCount === 1) {
        res.status(200).json({
          message: 'Updated comment successfully'
        });
      } else {
        // console.log(error);
        res.status(404).json({
          error: `Comment not found`
        });
      }
    }
  });
});

// Delete comment
router.delete('/comments/:commentID', function (req, res) {
  var commentID = req.params.commentID;

  const deleteCommentQuery = {
    text: 'DELETE FROM post_comments WHERE comment_id=$1;',
    values: [commentID],
  };

  connection.query(deleteCommentQuery, function (error, result) {
    if (error) {
      // console.log(error);
      res.status(400).json({
        error: 'Error while deleting comment'
      });
    } else {
      if (result.rowCount === 1) {
        // console.log(result);
        res.status(200).json({
          message: 'Deleted comment successfully'
        });
      } else {
        // console.log(error);
        res.status(404).json({
          error: `Comment not found`
        });
      }
    }
  });
});

// Retrieve all posts made by user
router.get('/user-profile/posts/:userID', function (req, res) {
  var userID = req.params.userID;

  const getUserPostsQuery = {
    text: 'SELECT * FROM posts WHERE creator=$1;',
    values: [userID],
  };

  connection.query(getUserPostsQuery, function (error, result) {
    if (error) {
      // console.log(error);
      res.status(500).json({
        error: 'Error while retrieving posts'
      });
    } else {
      if (result) {
        // console.log(result);
        res.status(200).json({
          message: 'Retrieved posts successfully',
          result: result.rows
        });
      } else {
        // console.log(error);
        res.status(404).json({
          error: `Posts not found`
        });
      }
    }
  });
});

// Retrieve all comments made by user
router.get('/user-profile/comments/:userID', function (req, res) {
  var userID = req.params.userID;

  const getUserCommentsQuery = {
    text: 'SELECT * FROM post_comments WHERE creator=$1;',
    values: [userID],
  };

  connection.query(getUserCommentsQuery, function (error, result) {
    if (error) {
      // console.log(error);
      res.status(500).json({
        error: 'Error while retrieving comments'
      });
    } else {
      if (result) {
        // console.log(result);
        res.status(200).json({
          message: 'Retrieved comments successfully',
          result: result.rows
        });
      } else {
        // console.log(error);
        res.status(404).json({
          error: `Comments not found`
        });
      }
    }
  });
});

module.exports = router;
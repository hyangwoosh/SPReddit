const router = require('express').Router();
const { nanoid } = require('nanoid');
const connection = require('../database/database');
const { isObjectEmpty } = require('../utils');

// Get Posts
router.post('/query', async (req, res) => {
  try {
    const { filter } = req.body;
    const isFilter = !isObjectEmpty(filter);

    const query = {
      get: () => `SELECT * FROM posts LIMIT 100`,
      filter: () =>
        `SELECT * FROM posts WHERE UPPER(title) LIKE '%${filter?.title?.toUpperCase()}%' OR SOUNDEX(title) = SOUNDEX('${
          filter?.title
        }') LIMIT 100`,
    };

    const result = await connection.query(
      isFilter ? query.filter() : query.get(),
    );
    if (!result)
      return res.status(404).json({
        error: 'Error while retrieving posts',
      });

    return res.status(200).json({
      result: result.rows,
    });
  } catch (e) {
    console.log({ e });
  }
});

// Get Top Posts
router.get('/top', async (req, res) => {
  const query = 'SELECT * FROM posts';
  const result = await connection.query(query);

  if (!result)
    return res.status(404).json({
      error: 'Error while retrieving posts',
    });

  return res.status(200).json({
    result: result.rows,
  });
});

// Get Hot Posts
router.get('/hot', async (req, res) => {
  const query = 'SELECT * FROM posts';
  const result = await connection.query(query);

  if (!result)
    return res.status(404).json({
      error: 'Error while retrieving posts',
    });

  return res.status(200).json({
    result: result.rows,
  });
});

// Get Post By Id
router.get('/:id', async (req, res) => {
  const { id } = req.params;

  const query = `SELECT * FROM posts WHERE post_id=${id}`;

  const result = await connection.query(query);
  if (!result)
    return res.status(404).json({
      error: `Post ${id} not found!`,
    });

  return res.status(200).json({
    message: 'Retrieved post successfully',
    result: result.rows[0],
  });
});

// Create Post
router.post('/', async (req, res) => {
  try {
    const { title, content, creator } = req.body;

    const created_at = new Date().toISOString();
    const updated_at = new Date().toISOString();

    const values = { title, content, creator, created_at, updated_at };
    const columns = Object.keys(values);
    const rows = Object.values(values);

    const query = {
      create: ({ title, content, creator, created_at, updated_at }) =>
        `INSERT INTO posts (${columns.join(
          ',',
        )}) VALUES ('${title}', '${content}', '${creator}', '${created_at}', '${updated_at}') RETURNING post_id`,
      addLike: ({ postId }) =>
        `INSERT INTO likable (post_id) VALUES (${postId})`,
    };

    // Creating
    const createdPost = await connection.query(query.create(values));
    if (!createdPost)
      return res.status(404).json({
        error: 'Error while adding post',
      });

    const postId = createdPost.rows[0]?.post_id;

    // Updating
    const updatedPost = await connection.query(query.addLike({ postId }));
    if (!updatedPost)
      return res.status(400).json({
        error: 'Error while adding likable post object',
      });

    return res.status(201).json({
      message: 'Added post successfully',
      result: { id: postId },
    });
  } catch (e) {
    console.log({ e });
  }
});

// Update post
router.put('/:id', async (req, res) => {
  const { id } = req.params;

  const { title, content } = req.body;
  const updated_at = new Date().toISOString();

  const query = `UPDATE posts SET title='${title}',content='${content}',updated_at='${updated_at}' WHERE post_id=${id}`;

  const result = await connection.query(query);
  if (!result)
    return res.status(400).json({
      error: 'Error while updating post',
    });

  return res.status(200).json({
    message: 'Updated post successfully',
  });
});

// Delete post
router.delete('/:id', async (req, res) => {
  const { id } = req.params;

  const query = `DELETE FROM posts WHERE post_id=${id}`;

  const result = await connection.query(query);
  if (!result)
    return res.status(400).json({
      error: 'Error while deleting post',
    });

  return res.status(200).json({
    message: 'Deleted post successfully',
  });
});

// Create comment
router.post('/comments', function (req, res) {
  const post_id = req.body.post_id;
  const creator = req.body.creator;
  const content = req.body.content;

  const addCommentQuery = {
    text: 'INSERT INTO post_comments (post_id,creator,content) VALUES ($1,$2,$3) RETURNING comment_id;',
    values: [post_id, creator, content],
  };

  connection.query(addCommentQuery, function (error, result) {
    if (error) {
      // console.log(error);
      res.status(400).json({
        error: 'Error while adding comment',
      });
    } else {
      const commentID = result.rows[0].comment_id;

      const addLikableCommentQuery = {
        text: 'INSERT INTO likable (comment_id) VALUES ($1);',
        values: [commentID],
      };

      connection.query(addLikableCommentQuery, function (error, result) {
        if (error) {
          // console.log(error);
          res.status(400).json({
            error: 'Error while adding likable comment object',
          });
        } else {
          // console.log(result);
          res.status(200).json({
            message: 'Added comment successfully',
          });
        }
      });
    }
  });
});

// Retrieve all comments from a specific post
router.get('/comments/posts/:postID', function (req, res) {
  const postID = req.params.postID;

  const getCommentsQuery = {
    text: 'SELECT * FROM post_comments WHERE post_id=$1;',
    values: [postID],
  };

  connection.query(getCommentsQuery, function (error, result) {
    if (error) {
      // console.log(error);
      res.status(500).json({
        error: 'Error while retrieving comments',
      });
    } else {
      if (result) {
        // console.log(result);
        res.status(200).json({
          message: 'Retrieved comments successfully',
          result: result.rows,
        });
      } else {
        // console.log(error);
        res.status(404).json({
          error: 'Comments not found',
        });
      }
    }
  });
});

// Retrieve comment by ID
router.get('/comments/:commentID', function (req, res) {
  const commentID = req.params.commentID;

  const getCommentByIDQuery = {
    text: 'SELECT * FROM post_comments WHERE comment_id=$1;',
    values: [commentID],
  };

  connection.query(getCommentByIDQuery, function (error, result) {
    if (error) {
      // console.log(error);
      res.status(500).json({
        error: 'Error while retrieving comment',
      });
    } else {
      if (result.rowCount === 1) {
        // console.log(result);
        res.status(200).json({
          message: 'Retrieved comment successfully',
          result: result.rows,
        });
      } else {
        // console.log(error);
        res.status(404).json({
          error: 'Comment not found',
        });
      }
    }
  });
});

// Update comment
router.put('/comments/:commentID', function (req, res) {
  const commentID = req.params.commentID;
  const content = req.body.content;

  const updateCommentQuery = {
    text: 'UPDATE post_comments SET content=$1 WHERE comment_id=$2;',
    values: [content, commentID],
  };

  connection.query(updateCommentQuery, function (error, result) {
    if (error) {
      // console.log(error);
      res.status(500).json({
        error: 'Error while updating comment',
      });
    } else {
      // console.log(result);
      if (result.rowCount === 1) {
        res.status(200).json({
          message: 'Updated comment successfully',
        });
      } else {
        // console.log(error);
        res.status(404).json({
          error: 'Comment not found',
        });
      }
    }
  });
});

// Delete comment
router.delete('/comments/:commentID', function (req, res) {
  const commentID = req.params.commentID;

  const deleteCommentQuery = {
    text: 'DELETE FROM post_comments WHERE comment_id=$1;',
    values: [commentID],
  };

  connection.query(deleteCommentQuery, function (error, result) {
    if (error) {
      // console.log(error);
      res.status(400).json({
        error: 'Error while deleting comment',
      });
    } else {
      if (result.rowCount === 1) {
        // console.log(result);
        res.status(200).json({
          message: 'Deleted comment successfully',
        });
      } else {
        // console.log(error);
        res.status(404).json({
          error: 'Comment not found',
        });
      }
    }
  });
});

// Retrieve all posts made by user
router.get('/user-profile/posts/:userID', function (req, res) {
  const userID = req.params.userID;

  const getUserPostsQuery = {
    text: 'SELECT * FROM posts WHERE creator=$1;',
    values: [userID],
  };

  connection.query(getUserPostsQuery, function (error, result) {
    if (error) {
      // console.log(error);
      res.status(500).json({
        error: 'Error while retrieving posts',
      });
    } else {
      if (result) {
        // console.log(result);
        res.status(200).json({
          message: 'Retrieved posts successfully',
          result: result.rows,
        });
      } else {
        // console.log(error);
        res.status(404).json({
          error: 'Posts not found',
        });
      }
    }
  });
});

// Retrieve all comments made by user
router.get('/user-profile/comments/:userID', function (req, res) {
  const userID = req.params.userID;

  const getUserCommentsQuery = {
    text: 'SELECT * FROM post_comments WHERE creator=$1;',
    values: [userID],
  };

  connection.query(getUserCommentsQuery, function (error, result) {
    if (error) {
      // console.log(error);
      res.status(500).json({
        error: 'Error while retrieving comments',
      });
    } else {
      if (result) {
        // console.log(result);
        res.status(200).json({
          message: 'Retrieved comments successfully',
          result: result.rows,
        });
      } else {
        // console.log(error);
        res.status(404).json({
          error: 'Comments not found',
        });
      }
    }
  });
});

// Retrieve likable ID by post ID
router.get('/likable/post/:postID', function (req, res) {
  const postID = req.params.postID;

  const getLikableByPostIDQuery = {
    text: 'SELECT likable_id FROM likable WHERE post_id=$1;',
    values: [postID],
  };

  connection.query(getLikableByPostIDQuery, function (error, result) {
    if (error) {
      // console.log(error);
      res.status(500).json({
        error: 'Error while retrieving likable ID',
      });
    } else {
      if (result.rowCount === 1) {
        // console.log(result);
        res.status(200).json({
          message: 'Retrieved likable ID successfully',
          result: result.rows,
        });
      } else {
        // console.log(error);
        res.status(404).json({
          error: 'Likable ID not found',
        });
      }
    }
  });
});

// Retrieve likable ID by comment ID
router.get('/likable/comment/:commentID', function (req, res) {
  const commentID = req.params.commentID;

  const getLikableByCommentIDQuery = {
    text: 'SELECT likable_id FROM likable WHERE comment_id=$1;',
    values: [commentID],
  };

  connection.query(getLikableByCommentIDQuery, function (error, result) {
    if (error) {
      // console.log(error);
      res.status(500).json({
        error: 'Error while retrieving likable ID',
      });
    } else {
      if (result.rowCount === 1) {
        // console.log(result);
        res.status(200).json({
          message: 'Retrieved likable ID successfully',
          result: result.rows,
        });
      } else {
        // console.log(error);
        res.status(404).json({
          error: 'Likable ID not found',
        });
      }
    }
  });
});

// Delete likable by Post ID
router.delete('/likable/post/:postID', function (req, res) {
  const postID = req.params.postID;

  const deleteLikableByPostIDQuery = {
    text: 'DELETE FROM likable WHERE post_id=$1;',
    values: [postID],
  };

  connection.query(deleteLikableByPostIDQuery, function (error, result) {
    if (error) {
      // console.log(error);
      res.status(500).json({
        error: 'Error while deleting likable post object',
      });
    } else if (result) {
      // console.log(result);
      res.status(200).json({
        message: 'Deleted likable post object successfully',
        result: result.rows,
      });
    } else {
      // console.log(error);
      res.status(404).json({
        error: 'Likable post object not found',
      });
    }
  });
});

// Delete likable by Comment ID
router.delete('/likable/comment/:commentID', function (req, res) {
  const commentID = req.params.commentID;

  const deleteLikableBycommentIDQuery = {
    text: 'DELETE FROM likable WHERE comment_id=$1;',
    values: [commentID],
  };

  connection.query(deleteLikableBycommentIDQuery, function (error, result) {
    if (error) {
      // console.log(error);
      res.status(500).json({
        error: 'Error while deleting likable comment object',
      });
    } else if (result) {
      // console.log(result);
      res.status(200).json({
        message: 'Deleted likable comment object successfully',
        result: result.rows,
      });
    } else {
      // console.log(error);
      res.status(404).json({
        error: 'Likable comment object not found',
      });
    }
  });
});

// Create/update like object
router.post('/likes', function (req, res) {
  const user_id = req.body.user_id;
  const likable_id = req.body.likable_id;
  const action = req.body.action;

  const addLikeQuery = {
    text:
      'INSERT INTO likes (user_id,likable_id,action) VALUES ($1,$2,$3) ' +
      'ON CONFLICT ON CONSTRAINT like_pk ' +
      'DO UPDATE SET action=$3 WHERE likes.user_id=$1 AND likes.likable_id=$2',
    values: [user_id, likable_id, action],
  };

  connection.query(addLikeQuery, function (error, result) {
    if (error) {
      // console.log(error);
      res.status(400).json({
        error: 'Error while adding like/dislike',
      });
    } else {
      // console.log(result);
      res.status(200).json({
        message: 'Added like/dislike successfully',
      });
    }
  });
});

// Retrieve all likes from a specific post
router.get('/likes/post/:postID', function (req, res) {
  const postID = req.params.postID;

  const getLikableByPostIDQuery = {
    text: 'SELECT * FROM likable WHERE post_id=$1;',
    values: [postID],
  };

  connection.query(getLikableByPostIDQuery, function (error, result) {
    if (error) {
      // console.log(error);
      res.status(500).json({
        error: 'Error while retrieving likable ID',
      });
    } else if (result.rowCount === 1) {
      const likableID = result.rows[0].likable_id;

      const getLikesQuery = {
        text: 'SELECT * FROM likes WHERE likable_id=$1;',
        values: [likableID],
      };

      connection.query(getLikesQuery, function (error, result) {
        if (error) {
          // console.log(error);
          res.status(500).json({
            error: 'Error while retrieving likes',
          });
        } else if (result) {
          // console.log(result);
          res.status(200).json({
            message: 'Retrieved likes successfully',
            result: result.rows,
          });
        } else {
          // console.log(error);
          res.status(404).json({
            error: 'Likes not found',
          });
        }
      });
    }
  });
});

// Retrieve all likes from a specific comment
router.get('/likes/comment/:commentID', function (req, res) {
  const commentID = req.params.commentID;

  const getLikableByCommentIDQuery = {
    text: 'SELECT * FROM likable WHERE comment_id=$1;',
    values: [commentID],
  };

  connection.query(getLikableByCommentIDQuery, function (error, result) {
    if (error) {
      // console.log(error);
      res.status(500).json({
        error: 'Error while retrieving likable ID',
      });
    } else if (result.rowCount === 1) {
      const likableID = result.rows[0].likable_id;

      const getLikesQuery = {
        text: 'SELECT * FROM likes WHERE likable_id=$1;',
        values: [likableID],
      };

      connection.query(getLikesQuery, function (error, result) {
        if (error) {
          // console.log(error);
          res.status(500).json({
            error: 'Error while retrieving likes',
          });
        } else if (result) {
          // console.log(result);
          res.status(200).json({
            message: 'Retrieved likes successfully',
            result: result.rows,
          });
        } else {
          // console.log(error);
          res.status(404).json({
            error: 'Likes not found',
          });
        }
      });
    }
  });
});

// Retrieve all likes from a specific user
router.get('/likes/:userID', function (req, res) {
  const userID = req.params.userID;

  const getLikesByUserQuery = {
    text: 'SELECT action FROM likes WHERE user_id=$1;',
    values: [userID],
  };

  connection.query(getLikesByUserQuery, function (error, result) {
    if (error) {
      // console.log(error);
      res.status(500).json({
        error: 'Error while retrieving likes',
      });
    } else {
      if (result) {
        // console.log(result);
        res.status(200).json({
          message: 'Retrieved likes successfully',
          result: result.rows,
        });
      } else {
        // console.log(error);
        res.status(404).json({
          error: 'Likes not found',
        });
      }
    }
  });
});

// Update likes
router.put('/likes', function (req, res) {
  const userID = req.body.userID;
  const likableID = req.body.likableID;
  const action = req.body.action;

  const updateLikesQuery = {
    text: 'UPDATE likes SET action=$1 WHERE user_id=$2 AND likable_id=$3;',
    values: [action, userID, likableID],
  };

  connection.query(updateLikesQuery, function (error, result) {
    if (error) {
      // console.log(error);
      res.status(500).json({
        error: 'Error while updating likes',
      });
    } else {
      // console.log(result);
      if (result.rowCount === 1) {
        res.status(200).json({
          message: 'Updated likes successfully',
        });
      } else {
        // console.log(error);
        res.status(404).json({
          error: 'Likes not found',
        });
      }
    }
  });
});

// Delete all likes
router.delete('/likes/:likableID', function (req, res) {
  const likableID = req.params.likableID;

  const deleteLikesQuery = {
    text: 'DELETE FROM likes WHERE likable_id=$1;',
    values: [likableID],
  };

  connection.query(deleteLikesQuery, function (error, result) {
    if (error) {
      // console.log(error);
      res.status(500).json({
        error: 'Error while deleting likes',
      });
    } else if (result) {
      // console.log(result);
      res.status(200).json({
        message: 'Deleted likes successfully',
        result: result.rows,
      });
    } else {
      // console.log(error);
      res.status(404).json({
        error: 'Likes not found',
      });
    }
  });
});

module.exports = router;
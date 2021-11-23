const router = require('express').Router();
const connection = require('../database/database');

// Create post
router.post('/', function (req, res) {
  var creator = req.body.creator;
  var title = req.body.title;
  var content = req.body.content;

  const addPostQuery = {
    text: 'INSERT INTO posts (creator,title,content) VALUES ($1,$2,$3) RETURNING post_id;',
    values: [creator,title,content],
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
        message: `Added post no. ${result} successfully`
      });
    }
  });
});

// Retrieve all notes
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
    text: 'SELECT * FROM posts WHERE post_id = $1;',
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
          error: `Post ID ${postID} not found`
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
  var content = new Date.now();

  const updatePostQuery = {
    text: 'UPDATE posts SET title=$1, content=$2, updated_at=$3 WHERE post_id=$4;',
    values: [title,content,updated_at,postID],
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
          error: `Post ID ${postID} not found`
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
          error: `Post ID ${postID} not found`
        });
      }
    }
  });
});

module.exports = router;
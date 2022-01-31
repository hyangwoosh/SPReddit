require('dotenv').config();
const router = require('express').Router();
const connection = require('../database/database');
const jwt = require('jsonwebtoken'); 

// Update specific user
<<<<<<< HEAD
// GET user profile
<<<<<<< HEAD
=======
// Retrieve specific user profile by ID? (GET)
>>>>>>> 75b4a98 (Jerald - Get user profile)
router.get('/getUsers/:username', function (req, res) {
    var username = req.params.username;

    const getUsersQuery = {
<<<<<<< HEAD
        text: 'SELECT * FROM users WHERE username = $1;',
        values: [username],
=======
      text: 'SELECT * FROM users WHERE username = $1;',
      values: [username],
>>>>>>> 75b4a98 (Jerald - Get user profile)
=======
=======
// GET user profile
router.get('/getinfo', function(req, res) {
  var jwtfetch = req.query.jwt

  jwt.verify(jwtfetch, process.env.ACCESS_TOKEN_SECRET, function(err, jwt) {
    
    const sql = "SELECT * FROM users WHERE email = ($1)";
    const values = [jwt.email];

    connection.query(sql, values, (error, result) => {

      if (error != null) {
  
        if (error) {
          res.send(error);
        }
      } else if (result != null) {
  
        if (result.rows.length == 0) {
  
          res.send({ "message": `Information not found` });
        } else {

            res.send({ "username": result.rows[0].username });
        }
      }
    })

  });
})

>>>>>>> e1eb23e (login w jwt and authenticate)
router.get('/getUsers/:id', function (req, res) {
    var id = req.params.id;

    const getUsersQuery = {
      text: 'SELECT * FROM users WHERE id = $1;',
      values: [id],
>>>>>>> 51f718d (Jerald - Update user + changed get user to use id (Yan Bin))
    };

    connection.query(getUsersQuery, function (error, result) {
        if (error) {
<<<<<<< HEAD
            // console.log(error);
            res.status(500).json({
                error: 'Error while retrieving profile'
            });
        } else {
            if (result) {
                // console.log(result);
                res.status(200).json({
                    message: 'Retrieved profile successfully',
                    result: result.rows
                });
            } else {
                // console.log(error);
                res.status(404).json({
                    error: `Profile not found`
                });
            }
        }
    });
});
=======
          // console.log(error);
          res.status(500).json({
            error: 'Error while retrieving profile'
          });
        } else {
          if (result) {
            // console.log(result);
            res.status(200).json({
              message: 'Retrieved profile successfully',
              result: result.rows
            });
          } else {
            // console.log(error);
            res.status(404).json({
              error: `Profile not found`
            });
          }
        }
      });
    });

// Retrieve email
router.get('/getEmail', function (req, res) {
  const getUsersQuery = {
      text: 'SELECT * FROM users WHERE email = $2',
  };

  connection.query(getUsersQuery, function (error, result) {
<<<<<<< HEAD
      if (error) {
=======
    if (error) {
      // console.log(error);
      res.status(500).json({
        error: 'Error while retrieving profile',
      });
    } else {
      if (result) {
        // console.log(result);
        res.status(200).json({
          message: 'Retrieved profile successfully',
          result: result.rows,
        });
      } else {
>>>>>>> 3f850aa (Minor changes)
        // console.log(error);
        res.status(500).json({
          error: 'Error while retrieving profile'
        });
      } else {
        if (result) {
          // console.log(result);
          res.status(200).json({
            message: 'Retrieved profile successfully',
            result: result.rows
          });
        } else {
          // console.log(error);
          res.status(404).json({
            error: `Profile not found`
          });
        }
      }
    });
  });
  
// retrieve password

<<<<<<< HEAD
// update username
router.put('/:username', function (req, res) {
  var userid = req.params.userid;
=======
// Update User Profile Username
router.put('/updateUser/:id', function (req, res) {
  const id = req.params.id;
  const username = req.body.username;
  const email = req.body.email;
  const password = req.body.password;
>>>>>>> 3f850aa (Minor changes)

  const updatePostQuery = {
    text: 'UPDATE email SET title=$1, content=$2, updated_at=$3 WHERE post_id=$4;',
    values: [emailID],
  };

<<<<<<< HEAD
<<<<<<< HEAD
  connection.query(updatePostQuery, function (error, result) {
    if (error) {
      // console.log(error);
      res.status(500).json({
        error: 'Error while updating post'
=======
  connection.query(updateUserQuery, function(error, result) {
=======
  connection.query(updateUserQuery, function (error, result) {
>>>>>>> 3f850aa (Minor changes)
    if (error) {
      // console.log(error);
      res.status(500).json({
        error: 'Error while updating user',
>>>>>>> 73b5445 (Likes feature (Unfinished))
      });
    } else {
      // console.log(result);
      if (result.rowCount === 1) {
        res.status(200).json({
<<<<<<< HEAD
          message: 'Updated post successfully'
=======
          message: 'Updated user successfully',
>>>>>>> 73b5445 (Likes feature (Unfinished))
        });
      } else {
        // console.log(error);
        res.status(404).json({
<<<<<<< HEAD
          error: `Post ID ${postID} not found`
=======
          error: `User not found`,
>>>>>>> 73b5445 (Likes feature (Unfinished))
        });
      }
    }
  });
});

<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
// update password
router.put

>>>>>>> 75b4a98 (Jerald - Get user profile)
=======
>>>>>>> 73b5445 (Likes feature (Unfinished))
module.exports = router;
=======
module.exports = router;
>>>>>>> 3f850aa (Minor changes)
=======
router.get('/userpost', function (req, res) {
  var id = req.params.id;
  Authorization: Bearer

  const getUsersQuery = {
    text: 'SELECT * FROM users WHERE id = $1;',
    values: [id],
  };

  connection.query(getUsersQuery, function (error, result) {
      if (error) {
        // console.log(error);
        res.status(500).json({
          error: 'Error while retrieving profile'
        });
      } else {
        if (result) {
          // console.log(result);
          res.status(200).json({
            message: 'Retrieved profile successfully',
            result: result.rows
          });
        } else {
          // console.log(error);
          res.status(404).json({
            error: `Profile not found`
          });
        }
      }
    });
  });

module.exports = router;
>>>>>>> e1eb23e (login w jwt and authenticate)

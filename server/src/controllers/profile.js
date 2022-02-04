require('dotenv').config();
const router = require('express').Router();
const connection = require('../database/database');
const jwt = require('jsonwebtoken'); 

// GET user profile
router.get('/getinfo', function(req, res) {
  var bearerToken = req.headers.authorization;

  const jwtToken = bearerToken.split("Bearer ")[1]
  jwt.verify(jwtToken, process.env.ACCESS_TOKEN_SECRET, function(err, jwtTokenDecrypted) {
    if (err) {
      // logout here 
      res.status(401).send("Message")
    } else {
      // read data from the jwt token
      const { username, email } = jwtTokenDecrypted;

      res.status(200).send({ username, email });
    }
    

  });
})

router.get('/getUsers/:id', function (req, res) {
  const id = req.params.id;

  const getUsersQuery = {
    text: 'SELECT * FROM users WHERE id = $1;',
    values: [id],
  };

  connection.query(getUsersQuery, function (error, result) {
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
        // console.log(error);
        res.status(404).json({
          error: `Profile not found`,
        });
      }
    }
  });
});

// Update User Profile Username
router.put('/updateUser/:id', function (req, res) {
  const id = req.params.id;
  const username = req.body.username;
  const email = req.body.email;
  const password = req.body.password;

  const updateUserQuery = {
    text: 'UPDATE users SET username=$1, email=$2, password=$3 WHERE id=$4;',
    values: [username, email, password, id],
  };

  connection.query(updateUserQuery, function (error, result) {
    if (error) {
      // console.log(error);
      res.status(500).json({
        error: 'Error while updating user',
      });
    } else {
      // console.log(result);
      if (result.rowCount === 1) {
        res.status(200).json({
          message: 'Updated user successfully',
        });
      } else {
        // console.log(error);
        res.status(404).json({
          error: `User not found`,
        });
      }
    }
  });
});

router.get('/userpost', function (req, res) {
  var id = req.params.id;

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
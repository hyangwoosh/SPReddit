require('dotenv').config();
const router = require('express').Router();
const connection = require('../database/database');
const jwt = require('jsonwebtoken'); 

// Get User By Id
router.get('/:id', async (req, res) => {
  try {
    const { id } = req.params;

    const query = `SELECT * FROM users WHERE id=${id}`;

    const result = await connection.query(query);
    if (!result)
      return res.status(404).json({
        error: `User ${id} Not Found!`,
      });

    return res.status(200).json({
      message: 'Retrieved profile successfully',
      result: result.rows[0],
    });
  } catch (e) {
    console.log({ e });
  }
});

router.put('/:id', function (req, res) {
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

router.delete('/delete', function (req, res) {
  const deletename = req.query.username;
  const deletepw = req.query.password;

  const sql = 'DELETE FROM users WHERE username = ($1) and password = ($2)';
  const values = [deletename, deletepw];

  connection.query(sql, values, (error, result) => {
    if (error) {
      res.send(error);
    } else {
      if (result.rowCount == 0) {
        res.send({
          message: `Incorect Credentials`,
        });
      } else {
        res.send({
          message: `User ${deletename} has been deleted`,
        });
      }
    }
  });
});

// login user
router.post('/login', function (req, res) {
  const logemail = req.body.email;
  const logpassword = req.body.password;

  const email = { email: logemail };

  const sql = "SELECT * FROM users WHERE email = ($1) and password = ($2)";
  const values = [logemail, logpassword];

  connection.query(sql, values, (error, result) => {
    if (error != null) {
      if (error) {
        res.send(error);
      }
    } else if (result != null) {
      if (result.rows.length == 0) {
        res.send({
          'message': `Incorrect Credentials`
        });
      } else {
          const jwt = generateAccessToken(email);
          res.send({ "jwt": jwt });
      }
    }
  });
});

function generateAccessToken(email) {
    return jwt.sign(email, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '1800s'})
}

//register user
router.post('/register', function (req, res) {
  var regusername = req.body.username;
  var regemail = req.body.email;
  var regpassword = req.body.password;
  var regrole = req.body.role;
  
  const sql = "INSERT INTO users (username, email, password, role) VALUES ($1,$2,$3,$4)";
  const values = [regusername, regemail, regpassword, regrole];

  connection.query(sql, values, (error, result) => {
    if (error != null) {
      if (error.code === '23505') {
        res.send({
          'message': `The username ${regusername} 
        and email ${regemail} already exists`
        });
      } else if (error) {
        res.send(error);
      }
    } else if (result != null) {
      res.send({
        'message': 'Your account has been created successfully'
      });
    }
  });
});

router.delete('/logout', (req, res) => {
  
})

//delete user
router.delete('/delete', function (req, res) {
  const deletename = req.query.username;
  const deletepw = req.query.password;

  const sql = 'DELETE FROM users WHERE username = ($1) and password = ($2)';
  const values = [deletename, deletepw];

  connection.query(sql, values, (error, result) => {

    if (error) {
      res.send(error);
    } else {
      if (result.rowCount == 0) {
        res.send({
          'message': `Incorect Credentials`
        });
      } else {
        res.send({
          'message': `User ${deletename} has been deleted`
        });
      }
    }
  });
});

module.exports = router;
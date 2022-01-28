const router = require('express').Router();
const connection = require('../database/database');

router.post('/login', function (req, res) {
  const logemail = req.body.email;
  const logpassword = req.body.password;

  const sql = 'SELECT * FROM users WHERE email = ($1) and password = ($2)';
  const values = [logemail, logpassword];

  connection.query(sql, values, (error, result) => {
    if (error != null) {
      if (error) {
        res.send(error);
      }
    } else if (result != null) {
      if (result.rows.length == 0) {
        res.send({
          message: `Incorrect Credentials`,
        });
      } else {
        res.send({
          message: `${result.rows[0].username}`,
          id: `${result.rows[0].id}`,
          password: `${result.rows[0].password}`,
        });
      }
    }
  });
});

// register user
router.post('/register', function (req, res) {
  let regusername = req.body.username;
  const regemail = req.body.email;
  const regpassword = req.body.password;

  if (regusername == 'user1') {
    regusername = null;
  }
  const sql = 'INSERT INTO users (username, email, password) VALUES ($1,$2,$3)';
  const values = [regusername, regemail, regpassword];

  connection.query(sql, values, (error, result) => {
    if (error != null) {
      if (error.code === '23505') {
        res.send({
          message: `The username ${regusername} 
        and email ${regemail} already exists`,
        });
      } else if (error) {
        res.send(error);
      }
    } else if (result != null) {
      res.send({
        message: 'Your account has been created successfully',
      });
    }
  });
});

module.exports = router;

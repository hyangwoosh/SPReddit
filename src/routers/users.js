const router = require('express').Router();
const connection = require('../database/database');

//login user

router.post('/login', function(req, res) {
  var logemail = req.body.email;
  var logpassword = req.body.password;

  const sql = "SELECT * FROM users WHERE email = ($1) and password = ($2)";
  const values = [logemail, logpassword];
  
  connection.query(sql, values, (error, result) => {

    if(error != null){

      if(error){
        res.send(error);
      }
    } else if(result != null){

      if(result.rows.length == 0){

        res.send({"message": `Incorrect Credentials`});
      } else{
        res.send({"message": `${result.rows[0].username}`, "password": `${result.rows[0].password}`});
      }
    }
  })
})

//register user
router.post('/register', function(req, res) {
    var regusername = req.body.username;
    var regemail = req.body.email;
    var regpassword = req.body.password;

    const sql = "INSERT INTO users (username, email, password) VALUES ($1,$2,$3)";
    const values = [regusername, regemail, regpassword];
    
    connection.query(sql, values, (error, result) => {
      if(error != null){
        if(error.code === "23505"){

          res.send({ "message": `The username ${regusername} and email ${regemail} already exists` });
        } else if(error){
  
          res.send(error);
        }
      }else if(result != null){
        res.send({ "message": "Your account has been created successfully" });
      }
        
    })
})

//delete user
router.delete('/delete', function(req, res) {
  var deletename = req.query.username;
  var deletepw = req.query.password;

  const sql = "DELETE FROM users WHERE username = ($1) and password = ($2)";
  const values = [deletename, deletepw];
  
  connection.query(sql, values, (error, result) => {

    if(error != null){

      if (error){

        res.send(error)
      }
    } else if (result != null){

      if(result.rowCount == 0){

        res.send({"message": `Incorect Credentials`});
      } else {

        res.send({"message": `User ${deletename} has been deleted`});
      }
    }

  })
  
})


module.exports = router;
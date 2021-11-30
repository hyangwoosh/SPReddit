const router = require('express').Router();
const connection = require('../database/database');

router.post('/', function(req, res) {
    var regusername = req.body.username;
    var regemail = req.body.email;
    var regpassword = req.body.password;

    const sql = "INSERT INTO users (username, email, password) VALUES ($1,$2,$3)";
    const values = [regusername, regemail, regpassword];
    
    connection.query(sql, values, (error, result) => {
      if(error != null){
        if(error.code === "23505"){

          res.send( `User ${regusername} already exists` );
        } else if(error){
  
          res.send(error);
        }
      }else if(result != null){
        res.send("Your account has been created successfully");
      }
        
    })
})

module.exports = router;
window.addEventListener("DOMContentLoaded", function () {
  
  // Check password for password textbox
  var checkpw = document.getElementById("register-password");
  checkpw.addEventListener("keyup", function () {

    var checkpassword = document.getElementById("register-password").value;
    var checkcnfrmpassword = document.getElementById("cnfrm-password").value;

    var confirmation = document.getElementById("confirmation")

    if (checkpassword.length != 0) {
      if (checkpassword == checkcnfrmpassword) {
        confirmation.textContent = "Passwords match";
        confirmation.style.backgroundColor = "#90EE90";

      }
      else {
        confirmation.textContent = "Passwords don't match";
        confirmation.style.backgroundColor = "#FF7276";
      }

    }
  })

  //check password for check confirm password textbox
  var checkpw = document.getElementById("cnfrm-password");
  checkpw.addEventListener("keyup", function () {

    var checkpassword = document.getElementById("register-password").value;
    var checkcnfrmpassword = document.getElementById("cnfrm-password").value;

    var confirmation = document.getElementById("confirmation")

    if (checkpassword.length != 0) {
      if (checkpassword == checkcnfrmpassword) {
        confirmation.textContent = "Passwords match";
        confirmation.style.backgroundColor = "#90EE90";

      }
      else {
        confirmation.textContent = "Passwords don't match";
        confirmation.style.backgroundColor = "#FF7276";
      }

    }
  })

  //register account
  var adduser = document.getElementById("registeracc");
  adduser.addEventListener("click", function () {

    var regusername = document.getElementById("register-username").value;
    var regemail = document.getElementById("register-email").value;
    var regpassword = document.getElementById("register-password").value;

    if (regusername == "" || regemail == "" || regpassword == "") {
      alert("Please make sure all input values have been filled");
      window.location.reload();
    }
    else {

      var password = document.getElementById("register-password").value;
      var cnfrmpassword = document.getElementById("cnfrm-password").value;

      if (password.length != 0) {
        if (password == cnfrmpassword) {
          axios.post('/api/users/register', {
            username: regusername,
            email: regemail,
            password: regpassword
          })
            .then(function (res) {

              if (res.data.message == "Your account has been created successfully") {
                alert(res.data.message);
                window.location.href = "../"
              }
              else {
                alert(res.data.message);
              }
            })
            .catch(function (err) {
              console.log(err);
            })
        }
        else {
          alert("Your passwords do not match")
        }
      }

    }

  })



});
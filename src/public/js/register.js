window.addEventListener("DOMContentLoaded", function () {

  //register account
  var adduser = document.getElementById("registeracc");
  adduser.addEventListener("click", function () {

    var regusername = document.getElementById("register-username").value;
    var regemail = document.getElementById("register-email").value;
    var regpassword = document.getElementById("register-password").value;

    if (regusername == "" || regemail == "" || regpassword == "") {
      alert("Please make sure all input values have been filled");
      window.location.reload;
    }
    else {

      let password = document.getElementById("register-password").value;
      let cnfrmpassword = document.getElementById("cnfrm-password").value;

      console.log(password, cnfrmpassword);

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
window.addEventListener("DOMContentLoaded", function () {

    //register account
    var adduser = document.getElementById("registeracc");
    adduser.addEventListener("click", function() {

        var regusername = document.getElementById("register-username").value;
        var regemail = document.getElementById("register-email").value;
        var regpassword = document.getElementById("register-password").value;

        if(regusername == " " || regemail == " " || regpassword == " "){
          regusername = null
          regemail = null
          regpassword = null
        }

        axios.post('/api/users/register', {
                username: regusername,
                email: regemail,
                password: regpassword
        })
        .then(function (res) {

            if(res.data.message == "Your account has been created successfully"){
              window.location.href = "../index.html"
            }
            else{
              console.log(res.data.message);
            }
          })
        .catch(function (err) {
            console.log(err);
          })
    })

});
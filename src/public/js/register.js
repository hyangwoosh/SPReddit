window.addEventListener("DOMContentLoaded", function () {

    //register account
    var adduser = document.getElementById("registerbutton");
    adduser.addEventListener("click", function() {
        // Get the input value from the input field
        var regusername = document.getElementById("register-username").value;
        var regemail = document.getElementById("register-email").value;
        var regpassword = document.getElementById("register-password").value;

        // Send the name to the server via params
        axios.post('/api/users/', {
                username: regusername,
                email: regemail,
                password: regpassword
        })
        .then(function (res) {
            alert(res.data);
          })
        .catch(function (err) {
            console.log(err);
          })
    })
});
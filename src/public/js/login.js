window.addEventListener("DOMContentLoaded", function () {

    //login account
    var loginuser = document.getElementById("loginacc");
    loginuser.addEventListener("click", function() {

        var logemail = document.getElementById("login-email").value;
        var logpassword = document.getElementById("login-password").value;

        axios.post('/api/users/login', {
                email: logemail,
                password: logpassword
        })
        .then(function (res) {

            if(res.data.message == "User does not exist"){
                alert(res.data.message);
            }
            else {
                window.location.href = "../html/main.html"
                sessionStorage.setItem("username", res.data.message);
                sessionStorage.setItem("password", res.data.password);
            }
            

          })
        .catch(function (err) {
            console.log(err);
          })
    })

});
window.addEventListener("DOMContentLoaded", function () {

  //register account
  var deleteuser = document.getElementById("deleteacc");
  deleteuser.addEventListener("click", function () {

    var delusername = document.getElementById("delete-username").value;
    var delpassword = document.getElementById("delete-password").value;

    axios.delete('/api/users/delete?username=' + delusername + "&password=" + delpassword)

      .then(function (res) {
        if (res.data.message == "Incorrect Credentials") {
          alert(res.data.message);
        }
        else {
          window.location.href = "../"
          sessionStorage.removeItem("id");
          sessionStorage.removeItem("username");
          sessionStorage.removeItem("password");
        }
      })
      .catch(function (err) {
        console.log(err);
      })
  })

});
window.addEventListener("DOMContentLoaded", function () {

    //register account
    var deleteuser = document.getElementById("deleteacc");
    deleteuser.addEventListener("click", function() {

        var delusername = document.getElementById("delete-username").value;
        var delpassword = document.getElementById("delete-password").value;

        axios.delete('/api/users/delete?username='+ delusername + "&password=" + delpassword)

        .then(function (res) {
            alert(res.data.message);
          })
        .catch(function (err) {
            console.log(err);
          })
    })

});
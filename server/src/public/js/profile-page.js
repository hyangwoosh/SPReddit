window.addEventListener("DOMContentLoaded", function () {

    //user account

        var jwt = sessionStorage.getItem('jwt')
        axios.get('/api/profile/getinfo?jwt=' + jwt)
        .then(function (res) {

            if(res.data.message == "Information not found"){
                alert(res.data.message);
            }
            else {
                sessionStorage.setItem("username", res.data.username);
            }

          })
        .catch(function (err) {
            console.log(err);
          })

});
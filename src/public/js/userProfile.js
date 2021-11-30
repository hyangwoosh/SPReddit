window.addEventListener("DOMContentLoaded", function () {
    // Retrieve specific user details
    const username = sessionStorage.getItem("username");
    axios.get("http://localhost:8000/api/profile/getUsers/" + username).then((response) => {
        console.log(response.data);
        return response.data;
    }).then((data) => {
        // console.log(data);
        console.log("Successfully retrieved user details");
        document.getElementById("user-name").innerHTML = data.result[0].username;
        document.getElementById("user-email").innerHTML = data.result[0].email;
        document.getElementById("user-password").innerHTML = data.result[0].password;
    }).catch((error) => {
        // console.log(error);
        console.log("Error occurred while retrieving user details");
    })
});
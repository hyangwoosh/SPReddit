window.addEventListener("DOMContentLoaded", function () {
    // Retrieve specific user details
    const userID = sessionStorage.getItem("id");
    axios.get("http://localhost:8000/api/profile/getUsers/" + userID).then((response) => {
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
<<<<<<< HEAD
});
=======

    // Update user
    const updateUserButton = document.getElementById("update-user-button");
    updateUserButton.onclick = function () {
        const newName = document.getElementById("new-user-name").value;
        const newEmail = document.getElementById("new-user-email").value;
        const newPassword = document.getElementById("new-user-password").value;
        axios.put("http://localhost:8000/api/profile/updateUser/" + userID, {
            username: newName,
            email: newEmail,
            password: newPassword
        }).then((response) => {
            // console.log(response)
            return response.data
        }).then((data) => {
            // console.log(data)
            console.log("Successfully updated profile");
            alert("Successfully updated profile");
            window.location.reload();
        }).catch((error) => {
            // console.log(error)
            console.log("Error occurred while updating profile");
            alert("Error occurred while updating profile");
        })
    };
});
>>>>>>> 51f718d (Jerald - Update user + changed get user to use id (Yan Bin))

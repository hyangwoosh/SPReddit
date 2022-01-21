window.addEventListener("DOMContentLoaded", function () {
    // Retrieve specific user details
    const userID = sessionStorage.getItem("id");
    axios.get("http://localhost:8000/api/profile/getUsers/" + userID).then((response) => {
        console.log(response.data);
        return response.data;
    }).then((data) => {
      // console.log(data)
      console.log('Successfully updated profile');
      alert('Successfully updated profile');
      sessionStorage.setItem('username', newName);
      sessionStorage.setItem('password', newPassword);
      window.location.reload();
    }).catch((error) => {
<<<<<<< HEAD
        // console.log(error);
        console.log("Error occurred while retrieving user details");
    })
<<<<<<< HEAD
});
=======

    // Update user
    const updateUserButton = document.getElementById("update-user-button");
    updateUserButton.onclick = function () {
        const newName = document.getElementById("current-user-name").value;
        const newEmail = document.getElementById("current-user-email").value;
        const newPassword = document.getElementById("current-user-password").value;
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
            sessionStorage.setItem("username", newName);
            sessionStorage.setItem("password", newPassword);
            window.location.reload();
        }).catch((error) => {
            // console.log(error)
            console.log("Error occurred while updating profile");
            alert("Error occurred while updating profile");
        })
    };
});
>>>>>>> 51f718d (Jerald - Update user + changed get user to use id (Yan Bin))
=======
      // console.log(error)
      console.log('Error occurred while updating profile');
      alert('Error occurred while updating profile');
    });
  };
<<<<<<< HEAD
});
>>>>>>> 73b5445 (Likes feature (Unfinished))
=======
});
>>>>>>> 3f850aa (Minor changes)

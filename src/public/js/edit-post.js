window.addEventListener("DOMContentLoaded", function () {

    // Retrieve specific post
    const postID = post_id;
    axios.get("http://localhost:8000/api/posts/" + postID).then((response) => {
        // console.log(response.data);
        return response.data;
    }).then((data) => {
        // console.log(data);
        console.log("Successfully retrieved post");
        document.getElementById("current-post").innerHTML += "<table>" +
            "<thead>" +
            "<tr>" +
            "<th id='current-post-id' hidden>" + data.result[0].post_id + "</th>" +
            "</tr>" +
            "<tr>" +
            "<td><input type='text' id='current-post-title' value='" + data.result[0].title + "'></input></td>" +
            "</tr>" +
            "</thead>" +
            "<tbody>" +
            "<tr>" +
            "<td><input type='text' id='current-post-content' value='" + data.result[0].content + "'></input></td>" +
            "</tr>" +
            "<tr>" +
            "<td id='current-post-created-at'>Created at: " + data.result[0].created_at + "</td>" +
            "</tr>" +
            "<tr>" +
            "<td id='current-post-updated-at'>Updated at: " + data.result[0].updated_at + "</td>" +
            "</tr>" +
            "</tbody>" +
            "</table>" +
            "<br>";
    }).catch((error) => {
        // console.log(error);
        console.log("Error occurred while retrieving post");
    })

    // Update post
    const updatePostButton = document.getElementById("update-post-button");
    updatePostButton.onclick = function () {
        const newTitle = document.getElementById("current-post-title").value;
        const newContent = document.getElementById("current-post-content").value;
        console.log(newTitle);
        console.log(newContent);
        axios.put("http://localhost:8000/api/posts/" + postID, {
            title: newTitle,
            content: newContent
        }).then((response) => {
            // console.log(response)
            return response.data
        }).then((data) => {
            // console.log(data)
            console.log("Successfully updated post");
            alert("Successfully updated post");
            window.location.replace("user-profile.html");
        }).catch((error) => {
            // console.log(error)
            console.log("Error occurred while updating post");
            alert("Error occurred while updating post");
        })
    };

    // Delete post
    const deletePostButton = document.getElementById("delete-post-button")
    deletePostButton.onclick = function () {
        axios.delete('http://localhost:8000/api/posts/' + postID).then((response) => {
            // console.log(response)
            return response.data
        }).then((data) => {
            // console.log(data)
            console.log("Successfully deleted post");
            alert("Successfully deleted post");
            window.location.replace("user-profile.html");
        }).catch((error) => {
            // console.log(error)
            console.log("Error occurred while deleting post");
            alert("Error occurred while deleting post");
        })
    };
});
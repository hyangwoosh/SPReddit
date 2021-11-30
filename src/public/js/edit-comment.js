window.addEventListener("DOMContentLoaded", function () {

    // Retrieve specific comment
    const commentID = comment_id;
    axios.get("http://localhost:8000/api/posts/comments/" + commentID).then((response) => {
        // console.log(response.data);
        return response.data;
    }).then((data) => {
        // console.log(data);
        console.log("Successfully retrieved comment");
        document.getElementById("current-comment").innerHTML += "<table>" +
            "<thead>" +
            "<tr>" +
            "<th id='user-comment-id' hidden>" + data.result[0].comment_id + "</th>" +
            "</tr>" +
            "<tr>" +
            "<th id='user-post-comment-id' hidden>" + data.result[0].post_id + "</th>" +
            "</tr>" +
            "</thead>" +
            "<tbody>" +
            "<tr>" +
            "<td><input type='text' id='current-comment-content' value='" + data.result[0].content + "'></input></td>" +
            "</tr>" +
            "</tbody>" +
            "</table>" +
            "<br>";
    }).catch((error) => {
        // console.log(error);
        console.log("Error occurred while retrieving comment");
    })

    // Update comment
    const updateCommentButton = document.getElementById("update-comment-button");
    updateCommentButton.onclick = function () {
        const newContent = document.getElementById("current-comment-content").value;
        axios.put("http://localhost:8000/api/posts/comments/" + commentID, {
            content: newContent
        }).then((response) => {
            // console.log(response)
            return response.data
        }).then((data) => {
            // console.log(data)
            console.log("Successfully updated comment");
            alert("Successfully updated comment");
            window.location.replace("user-profile.html");
        }).catch((error) => {
            // console.log(error)
            console.log("Error occurred while updating comment");
            alert("Error occurred while updating comment");
        })
    };

    // Delete comment
    const deleteCommentButton = document.getElementById("delete-comment-button")
    deleteCommentButton.onclick = function () {
        axios.delete('http://localhost:8000/api/posts/comments/' + commentID).then((response) => {
            // console.log(response)
            return response.data
        }).then((data) => {
            // console.log(data)
            console.log("Successfully deleted comment");
            alert("Successfully deleted comment");
            window.location.replace("user-profile.html");
        }).catch((error) => {
            // console.log(error)
            console.log("Error occurred while deleting comment");
            alert("Error occurred while deleting comment");
        })
    };
});
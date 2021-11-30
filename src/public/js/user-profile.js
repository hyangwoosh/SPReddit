window.addEventListener("DOMContentLoaded", function () {

    const userID = sessionStorage.getItem("username");

    // Retrieve all posts made by user
    axios.get("http://localhost:8000/api/posts/user-profile/posts/" + userID).then((response) => {
        // console.log(response.data);
        return response.data;
    }).then((data) => {
        // console.log(data);
        console.log("Successfully retrieved posts");
        for (let i = 0; i < data.result.length; i++) {
            document.getElementById("user-posts").innerHTML += "<table>" +
                "<thead>" +
                "<tr>" +
                "<th id='user-post-id' hidden>" + data.result[i].post_id + "</th>" +
                "</tr>" +
                "<tr>" +
                "<td id='user-post-title'>" + data.result[i].title + "</td>" +
                "</tr>" +
                "</thead>" +
                "<tbody>" +
                "<tr>" +
                "<td id='user-post-content'>" + data.result[i].content + "</td>" +
                "</tr>" +
                "<tr>" +
                "<td id='user-post-created-at'>Created at: " + data.result[i].created_at + "</td>" +
                "</tr>" +
                "<tr>" +
                "<td id='user-post-updated-at'>Updated at: " + data.result[i].updated_at + "</td>" +
                "</tr>" +
                "<tr>" +
                "<td><a href='edit-post.html?post_id=" + data.result[i].post_id + "'><button id='edit-post-button'>Edit</button></a></td>" +
                "</tr>" +
                "</tbody>" +
                "</table>" +
                "<br>";
        };
    }).catch((error) => {
        // console.log(error);
        console.log("Error occurred while retrieving posts");
    })

    // Retrieve all comments made by user
    axios.get("http://localhost:8000/api/posts/user-profile/comments/" + userID).then((response) => {
        // console.log(response.data);
        return response.data;
    }).then((data) => {
        // console.log(data);
        console.log("Successfully retrieved comments");
        for (let i = 0; i < data.result.length; i++) {
            document.getElementById("user-comments").innerHTML += "<table>" +
                "<thead>" +
                "<tr>" +
                "<th id='user-comment-id' hidden>" + data.result[i].comment_id + "</th>" +
                "</tr>" +
                "<tr>" +
                "<th id='user-post-comment-id' hidden>" + data.result[i].post_id + "</th>" +
                "</tr>" +
                "</thead>" +
                "<tbody>" +
                "<tr>" +
                "<td id='user-comment-content'>" + data.result[i].content + "</td>" +
                "</tr>" +
                "<tr>" +
                "<td><a href='edit-comment.html?comment_id=" + data.result[i].comment_id + "'><button id='edit-comment-button'>Edit</button></a></td>" +
                "</tr>" +
                "</tbody>" +
                "</table>" +
                "<br>";
        };
    }).catch((error) => {
        // console.log(error);
        console.log("Error occurred while retrieving comments");
    })
});
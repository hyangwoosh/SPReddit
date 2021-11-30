window.addEventListener("DOMContentLoaded", function () {

    // Retrieve specific post
    const postID = post_id;
    axios.get("http://localhost:8000/api/posts/" + postID).then((response) => {
        // console.log(response.data);
        return response.data;
    }).then((data) => {
        // console.log(data);
        console.log("Successfully retrieved post");
        document.getElementById("current-post-title").innerHTML = data.result[0].title;
        document.getElementById("current-post-content").innerHTML = data.result[0].content;
        document.getElementById("current-post-created-at").innerHTML = "Created at: " + data.result[0].created_at;
        document.getElementById("current-post-updated-at").innerHTML = "Last updated at: " + data.result[0].updated_at;
    }).catch((error) => {
        // console.log(error);
        console.log("Error occurred while retrieving post");
    })

    // Create comment
    const addCommentButton = document.getElementById("add-comment-button");
    addCommentButton.onclick = function () {
        const postID = post_id;
        const commentCreator = sessionStorage.getItem("username");
        const commentContent = document.getElementById("comment-content").value;
        addCommentButton.disabled = true;
        alert("Please wait while we are creating your comment");
        axios.post("http://localhost:8000/api/posts/comments", {
            post_id: postID,
            creator: commentCreator,
            content: commentContent
        }).then((response) => {
            // console.log(response.data);
            return response.data;
        }).then((data) => {
            // console.log(data);
            console.log("Successfully added comment");
            alert("Successfully added comment");
            window.location.reload();
        }).catch((error) => {
            // console.log(error);
            console.log("Error occurred while adding comment");
            alert("Error occurred while adding comment");
        })
        addCommentButton.disabled = false;
    };

    // Retrieve all comments from post
    axios.get("http://localhost:8000/api/posts/comments/posts/" + postID).then((response) => {
        // console.log(response.data);
        return response.data;
    }).then((data) => {
        // console.log(data);
        console.log("Successfully retrieved comments");
        for (let i = 0; i < data.result.length; i++) {
            document.getElementById("comments").innerHTML += "<table>" +
                "<thead>" +
                "<tr>" +
                "<th id='post-id' hidden>" + data.result[i].comment_id + "</th>" +
                "<th id='post-id' hidden>" + data.result[i].post_id + "</th>" +
                "</tr>" +
                "</thead>" +
                "<tbody>" +
                "<tr>" +
                "<td id='post-content'>" + data.result[i].content + "</td>" +
                "</tr>" +
                "<tr>" +
                "<td id='post-creator' style='font-size: 13px'>" + data.result[i].creator + "</td>" +
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
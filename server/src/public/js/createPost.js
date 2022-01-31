window.addEventListener('DOMContentLoaded', function () {
    // Create post
    const addPostButton = document.getElementById('add-post-button');
    addPostButton.onclick = function () {
        const postCreator = sessionStorage.getItem('username');
        const postTitle = document.getElementById('post-title').value;
        const postContent = document.getElementById('post-content').value;
        addPostButton.disabled = true;
        alert('Please wait while we are creating your post');
        axios.post('http://localhost:8000/api/posts/v1', {
            creator: postCreator,
            title: postTitle,
            content: postContent,
        }).then((response) => {
            // console.log(response.data);
            return response.data;
        }).then((data) => {
            // console.log(data);
            console.log('Successfully added post');
            alert('Successfully added post');
            window.location.replace('main.html');
        }).catch((error) => {
            // console.log(error);
            console.log('Error occurred while adding post');
            alert('Error occurred while adding post');
        });
        addPostButton.disabled = false;
    };
});
window.addEventListener('DOMContentLoaded', function () {
  // Retrieve specific post
  const postID = post_id;
  axios.get('http://localhost:8000/api/posts/v1/' + postID).then((response) => {
    // console.log(response.data);
    return response.data;
  }).then((data) => {
    // console.log(data);
    console.log('Successfully retrieved post');
    document.getElementById('current-post').innerHTML +=
      `<table>
      <thead>
      <tr>
      <th id='current-post-id' hidden>` + data.result[0].post_id + `</th>
      </tr>
      <tr>
      <td><label>Title: </label><input type='text' id='current-post-title' value='` + data.result[0].title + `'></input></td>
      </tr>
      </thead>
      <tbody>
      <tr>
      <td><label>Content: </label><input type='text' id='current-post-content' value='` + data.result[0].content + `'></input></td>
      </tr>
      <tr>
      <td id='current-post-created-at'>Created at: ` + data.result[0].created_at + `</td>
      </tr>
      <tr>
      <td id='current-post-updated-at'>Updated at: ` + data.result[0].updated_at + `</td>
      </tr>
      </tbody>
      </table>
      <br>`;
  }).catch((error) => {
    // console.log(error);
    console.log('Error occurred while retrieving post');
  });

  // Update post
  const updatePostButton = document.getElementById('update-post-button');
  updatePostButton.onclick = function () {
    const newTitle = document.getElementById('current-post-title').value;
    const newContent = document.getElementById('current-post-content').value;
    console.log(newTitle);
    console.log(newContent);
    axios.put('http://localhost:8000/api/posts/v1/' + postID, {
      title: newTitle,
      content: newContent,
    }).then((response) => {
      // console.log(response)
      return response.data;
    }).then((data) => {
      // console.log(data)
      console.log('Successfully updated post');
      alert('Successfully updated post');
      window.location.replace('userProfile.html');
    }).catch((error) => {
      // console.log(error)
      console.log('Error occurred while updating post');
      alert('Error occurred while updating post');
    });
  };

  // Delete post
  const deletePostButton = document.getElementById('delete-post-button');
  deletePostButton.onclick = function () {
    // Get Post Likable ID
    axios.get('http://localhost:8000/api/posts/v1/likable/post/' + postID).then((response) => {
      // console.log(response)
      return response.data;
    }).then((data) => {
      // console.log(data)
      console.log('Successfully retrieved likable ID');

      let likableID = data.result[0].likable_id;

      // Delete Post Likes
      axios.delete('http://localhost:8000/api/posts/v1/likes/' + likableID).then((response) => {
        // console.log(response)
        return response.data;
      }).then((data) => {
        // console.log(data)
        console.log('Successfully deleted post likes');
      }).catch((error) => {
        // console.log(error)
        console.log('Error occurred while deleting post likes');
      });

    }).catch((error) => {
      // console.log(error)
      console.log('Error occurred while retrieving likable ID');
    });

    // Get Comment IDs
    axios.get('http://localhost:8000/api/posts/v1/comments/posts/' + postID).then((response) => {
      // console.log(response)
      return response.data;
    }).then((data) => {
      // console.log(data)
      console.log('Successfully retrieve comment IDs');

      for (let i = 0; i < data.result.length; i++) {

        // Get Comment Likable IDs
        axios.get('http://localhost:8000/api/posts/v1/likable/comment/' + data.result[i].comment_id).then((response) => {
          // console.log(response);
          return response.data;
        }).then((data) => {
          // console.log(data);
          console.log('Successfully retrieved comment likable ID');

          // Delete Comment Likes
          axios.delete('http://localhost:8000/api/posts/v1/likes/' + data.result[0].likable_id).then((response) => {
            // console.log(response)
            return response.data;
          }).then((data) => {
            // console.log(data)
            console.log('Successfully deleted comments likes');
          }).catch((error) => {
            // console.log(error)
            console.log('Error occurred while deleting comments likes');
          });

        }).catch((error) => {
          // console.log(error);
          console.log('Error occurred while retrieving comment likable ID');
        });

        // Delete Comment Likable Object
        axios.delete('http://localhost:8000/api/posts/v1/likable/comment/' + data.result[i].comment_id).then((response) => {
          // console.log(response)
          return response.data;
        }).then((data) => {
          // console.log(data)
          console.log('Successfully deleted comment likable object');
        }).catch((error) => {
          // console.log(error)
          console.log('Error occurred while deleting comment likable object');
        });

        // Delete Comment
        axios.delete('http://localhost:8000/api/posts/v1/comments/' + data.result[i].comment_id).then((response) => {
          // console.log(response)
          return response.data;
        }).then((data) => {
          // console.log(data)
          console.log('Successfully deleted comment');
        }).catch((error) => {
          // console.log(error)
          console.log('Error occurred while deleting comment');
        });
      }

    }).catch((error) => {
      // console.log(error)
      console.log('Error occurred while retrieving comment IDs');
    });

    // Delete Post Likable Object
    axios.delete('http://localhost:8000/api/posts/v1/likable/post/' + postID).then((response) => {
      // console.log(response)
      return response.data;
    }).then((data) => {
      // console.log(data)
      console.log('Successfully deleted post likable object');
    }).catch((error) => {
      // console.log(error)
      console.log('Error occurred while deleting post likable object');
    });

    // Delete Post
    axios.delete('http://localhost:8000/api/posts/v1/' + postID).then((response) => {
      // console.log(response)
      return response.data;
    }).then((data) => {
      // console.log(data)
      console.log('Successfully deleted post');
      alert('Successfully deleted post');
      window.location.replace('userProfile.html');
    }).catch((error) => {
      // console.log(error)
      console.log('Error occurred while deleting post');
      alert('Error occurred while deleting post');
    });
  };
});
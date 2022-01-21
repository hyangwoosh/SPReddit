window.addEventListener('DOMContentLoaded', function () {
  const userID = sessionStorage.getItem('username');

  // Retrieve all posts made by user
  axios.get('http://localhost:8000/api/posts/user-profile/posts/' + userID).then((response) => {
    // console.log(response.data);
    return response.data;
  }).then((data) => {
    // console.log(data);
    console.log('Successfully retrieved posts');
    for (let i = 0; i < data.result.length; i++) {

      axios.get('http://localhost:8000/api/posts/likes/post/' + data.result[i].post_id).then((response) => {
        // console.log(response.data);
        let totalLikes = 0;
        if (response.data.result.length == 0) {
          response.data = 0;
        } else {
          for (let i = 0; i < response.data.result.length; i++) {
            totalLikes += response.data.result[i].action;
          }
        }
        response.data = totalLikes;
        return response.data;
      }).then((data) => {
        // console.log(data);
        console.log('Successfully retrieved post likes');
        document.getElementById('post-likes-' + (i + 1) + '').innerHTML = data;
      }).catch((error) => {
        // console.log(error);
        console.log('Error occurred while retrieving post likes');
      });

      document.getElementById('user-posts').innerHTML +=
        `<table>
        <thead>
        <tr>
        <th id='user-post-id' hidden>` + data.result[i].post_id + `</th>
        </tr>
        <tr>
        <td id='user-post-title'>` + data.result[i].title + `</td>
        </tr>
        </thead>
        <tbody>
        <tr>
        <td id='user-post-content'>` + data.result[i].content + `</td>
        </tr>
        <tr>
        <td id='user-post-created-at'>Created at: ` + data.result[i].created_at + `</td>
        </tr>
        <tr>
        <td id='user-post-updated-at'>Updated at: ` + data.result[i].updated_at + `</td>
        </tr>
        </tbody>
        <tfoot>
        <tr>
        <td>` +

        // Like (+) button
        `<a onClick="

        axios.get('http://localhost:8000/api/posts/likable/post/' + ` + data.result[i].post_id + `).then((response) => {
          return response.data;
        }).then((data) => {
          console.log('Successfully retrieved likable ID');

          const userID = parseInt(sessionStorage.getItem('id'));
          const likableID = data.result[0].likable_id;
          const action = 1;

          axios.post('http://localhost:8000/api/posts/likes', {
            user_id: userID,
            likable_id: likableID,
            action: action,
          }).then((response) => {
            return response.data;
          }).then((data) => {
            console.log('Successfully liked post');
            window.location.reload();
          }).catch((error) => {
            console.log('Error occurred while liking post');
          });

        }).catch((error) => {
          console.log('Error occurred while retrieving likable ID');
        });

        "><button id='post-like-button'>+</button></a>` +

        // Number of likes
        `<div id='post-likes-` + (i + 1) + `'></div>` +

        // Dislike (-) button
        `<a onClick="

        axios.get('http://localhost:8000/api/posts/likable/post/' + ` + data.result[i].post_id + `).then((response) => {
          return response.data;
        }).then((data) => {
          console.log('Successfully retrieved likable ID');

          const userID = parseInt(sessionStorage.getItem('id'));
          const likableID = data.result[0].likable_id;
          const action = -1;

          axios.post('http://localhost:8000/api/posts/likes', {
            user_id: userID,
            likable_id: likableID,
            action: action,
          }).then((response) => {
            return response.data;
          }).then((data) => {
            console.log('Successfully liked post');
            window.location.reload();
          }).catch((error) => {
            console.log('Error occurred while liking post');
          });

        }).catch((error) => {
          console.log('Error occurred while retrieving likable ID');
        });

        "><button id='post-dislike-button'>-</button></a>

        <br>` +

        // Reset button
        `<a onClick="

        axios.get('http://localhost:8000/api/posts/likable/post/' + ` + data.result[i].post_id + `).then((response) => {
          return response.data;
        }).then((data) => {
          console.log('Successfully retrieved likable ID');

          const userID = parseInt(sessionStorage.getItem('id'));
          const likableID = data.result[0].likable_id;
          const action = 0;

          axios.post('http://localhost:8000/api/posts/likes', {
            user_id: userID,
            likable_id: likableID,
            action: action,
          }).then((response) => {
            return response.data;
          }).then((data) => {
            console.log('Successfully liked post');
            window.location.reload();
          }).catch((error) => {
            console.log('Error occurred while liking post');
          });

        }).catch((error) => {
          console.log('Error occurred while retrieving likable ID');
        });

        "><button id='post-like-reset-button'>Reset</button></a>
        </td>
        </tr>
        <tr>
        <td><a href='edit-post.html?post_id='` + data.result[i].post_id + `'><button id='edit-post-button'>Edit</button></a></td>
        </tr>
        </tfoot>
        </table>
        <br>
        <br>`;
    };
  }).catch((error) => {
    // console.log(error);
    console.log('Error occurred while retrieving posts');
  });

  // Retrieve all comments made by user
  axios.get('http://localhost:8000/api/posts/user-profile/comments/' + userID).then((response) => {
    // console.log(response.data);
    return response.data;
  }).then((data) => {
    // console.log(data);
    console.log('Successfully retrieved comments');
    for (let i = 0; i < data.result.length; i++) {

      axios.get('http://localhost:8000/api/posts/likes/comment/' + data.result[i].comment_id).then((response) => {
        // console.log(response.data);
        let totalLikes = 0;
        if (response.data.result.length == 0) {
          response.data = 0;
        } else {
          for (let i = 0; i < response.data.result.length; i++) {
            totalLikes += response.data.result[i].action;
          }
        }
        response.data = totalLikes;
        return response.data;
      }).then((data) => {
        // console.log(data);
        console.log('Successfully retrieved comment likes');
        document.getElementById('comment-likes-' + (i + 1) + '').innerHTML = data;
      }).catch((error) => {
        // console.log(error);
        console.log('Error occurred while retrieving comment likes');
      });

      document.getElementById('user-comments').innerHTML +=
        `<table>
        <thead>
        <tr>
        <th id='user-comment-id' hidden>` + data.result[i].comment_id + ` </th>
        </tr>
        <tr>
        <th id='user-post-comment-id' hidden>` + data.result[i].post_id + ` </th>
        </tr>
        </thead>
        <tbody>
        <tr>
        <td id='user-comment-content'>` + data.result[i].content + ` </td>
        </tr>
        </tbody>
        <tfoot>
        <tr>
        <td>` +

        // Like (+) button
        `<a onClick="

        axios.get('http://localhost:8000/api/posts/likable/comment/' + ` + data.result[i].comment_id + `).then((response) => {
          return response.data;
        }).then((data) => {
          console.log('Successfully retrieved likable ID');

          const userID = parseInt(sessionStorage.getItem('id'));
          const likableID = data.result[0].likable_id;
          const action = 1;

          axios.post('http://localhost:8000/api/posts/likes', {
            user_id: userID,
            likable_id: likableID,
            action: action,
          }).then((response) => {
            return response.data;
          }).then((data) => {
            console.log('Successfully liked comment');
            window.location.reload();
          }).catch((error) => {
            console.log('Error occurred while liking comment');
          });

        }).catch((error) => {
          console.log('Error occurred while retrieving likable ID');
        });

        "><button id='comment-like-button'>+</button></a>` +

        // Number of likes
        `<div id='comment-likes-` + (i + 1) + `'></div>` +

        // Dislike (-) button
        `<a onClick="

        axios.get('http://localhost:8000/api/posts/likable/comment/' + ` + data.result[i].comment_id + `).then((response) => {
          return response.data;
        }).then((data) => {
          console.log('Successfully retrieved likable ID');

          const userID = parseInt(sessionStorage.getItem('id'));
          const likableID = data.result[0].likable_id;
          const action = -1;

          axios.post('http://localhost:8000/api/posts/likes', {
            user_id: userID,
            likable_id: likableID,
            action: action,
          }).then((response) => {
            return response.data;
          }).then((data) => {
            console.log('Successfully liked comment');
            window.location.reload();
          }).catch((error) => {
            console.log('Error occurred while liking comment');
          });

        }).catch((error) => {
          console.log('Error occurred while retrieving likable ID');
        });

        "><button id='comment-dislike-button'>-</button></a>

        <br>` +

        // Reset button
        `<a onClick="

        axios.get('http://localhost:8000/api/posts/likable/comment/' + ` + data.result[i].comment_id + `).then((response) => {
          return response.data;
        }).then((data) => {
          console.log('Successfully retrieved likable ID');

          const userID = parseInt(sessionStorage.getItem('id'));
          const likableID = data.result[0].likable_id;
          const action = 0;

          axios.post('http://localhost:8000/api/posts/likes', {
            user_id: userID,
            likable_id: likableID,
            action: action,
          }).then((response) => {
            return response.data;
          }).then((data) => {
            console.log('Successfully liked comment');
            window.location.reload();
          }).catch((error) => {
            console.log('Error occurred while liking comment');
          });

        }).catch((error) => {
          console.log('Error occurred while retrieving likable ID');
        });

        "><button id='comment-like-reset-button'>Reset</button></a>
        </td>
        </tr>
        <tr>
        <td><a href='edit-comment.html?comment_id='` + data.result[i].comment_id + `'><button id='edit-comment-button'>Edit</button></a></td>
        </tr>
        </tfoot>
        </table>
        <br>
        <br>`;
    };
  }).catch((error) => {
    // console.log(error);
    console.log('Error occurred while retrieving comments');
  });
});
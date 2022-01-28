window.addEventListener('DOMContentLoaded', function () {
  // logout
  const logout = document.getElementById('logoutacc');
  logout.addEventListener('click', function () {
    window.location.href = '../';
    sessionStorage.removeItem('id');
    sessionStorage.removeItem('username');
    sessionStorage.removeItem('password');
  });

  // Retrieve all posts
  axios.get('http://localhost:8000/api/posts').then((response) => {
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
          totalLikes = 0;
        } else {
          for (let i = 0; i < response.data.result.length; i++) {
            totalLikes += response.data.result[i].action;
          }
        }
        response.data = [totalLikes, response.data.result.length];
        return response.data;
      }).then((data) => {
        // console.log(data);
        console.log('Successfully retrieved post likes');
        document.getElementById('post-likes-' + (i + 1) + '').innerHTML += data[0];
        document.getElementById('users-post-likes-' + (i + 1) + '').innerHTML += 'Rated by ' + data[1] + ' user(s)';
      }).catch((error) => {
        // console.log(error);
        console.log('Error occurred while retrieving post likes');
      });

      document.getElementById('posts').innerHTML +=
        `<table>
        <thead>
        <tr>
        <th id='post-id' hidden>` + data.result[i].post_id + `</th>
        <th id='post-title'>` + data.result[i].title + `</th>
        </tr>
        </thead>
        <tbody>
        <tr>
        <td id='post-content'>` + data.result[i].content + `</td>
        </tr>
        <tr>
        <td id='post-creator'>By: ` + data.result[i].creator + `</td>
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

        "><button id='post-like-reset-button'>Reset</button></a>` +

        // Number of users that liked
        `<div id='users-post-likes-` + (i + 1) + `'></div>` +

        `</td>
        </tr>
        <tr>
        <td><a href='post.html?post_id=` + data.result[i].post_id + `'><button id='view-post-button'>View post</button></a></td>
        </tr>
        </tfoot>
        </table>
        <br>`;
    };
  }).catch((error) => {
    // console.log(error);
    console.log('Error occurred while retrieving posts');
  });
});
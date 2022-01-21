window.addEventListener('DOMContentLoaded', function () {
  // login account
  const loginuser = document.getElementById('loginacc');
  loginuser.addEventListener('click', function () {
    const logemail = document.getElementById('login-email').value;
    const logpassword = document.getElementById('login-password').value;

    axios.post('/api/users/login', {
        email: logemail,
        password: logpassword,
      })
      .then(function (res) {
        if (res.data.message == 'Incorrect Credentials') {
          alert(res.data.message);
        } else {
          window.location.href = '../html/main.html';
          sessionStorage.setItem('id', res.data.id);
          sessionStorage.setItem('username', res.data.message);
          sessionStorage.setItem('password', res.data.password);
        }
      })
      .catch(function (err) {
        console.log(err);
      });
  });
});
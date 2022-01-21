window.addEventListener('DOMContentLoaded', function () {
  // Check password for password textbox
  var checkpw = document.getElementById('register-password');
  checkpw.addEventListener('keyup', function () {
    const checkpassword = document.getElementById('register-password').value;
    const checkcnfrmpassword = document.getElementById('cnfrm-password').value;

    const confirmation = document.getElementById('confirmation');

    if (checkpassword.length != 0) {
      if (checkpassword == checkcnfrmpassword) {
        confirmation.textContent = 'Passwords match';
        confirmation.style.backgroundColor = '#90EE90';
      } else {
        confirmation.textContent = 'Passwords don\'t match';
        confirmation.style.backgroundColor = '#FF7276';
      }
    }
  });

  // check password for check confirm password textbox
  var checkpw = document.getElementById('cnfrm-password');
  checkpw.addEventListener('keyup', function () {
    const checkpassword = document.getElementById('register-password').value;
    const checkcnfrmpassword = document.getElementById('cnfrm-password').value;

    const confirmation = document.getElementById('confirmation');

    if (checkpassword.length != 0) {
      if (checkpassword == checkcnfrmpassword) {
        confirmation.textContent = 'Passwords match';
        confirmation.style.backgroundColor = '#90EE90';
      } else {
        confirmation.textContent = 'Passwords don\'t match';
        confirmation.style.backgroundColor = '#FF7276';
      }
    }
  });

  // register account
  const adduser = document.getElementById('registeracc');
  adduser.addEventListener('click', function () {
    const regusername = document.getElementById('register-username').value;
    const regemail = document.getElementById('register-email').value;
    const regpassword = document.getElementById('register-password').value;

    if (regusername == '' || regemail == '' || regpassword == '') {
      alert('Please make sure all input values have been filled');
      window.location.reload();
    } else {
      const password = document.getElementById('register-password').value;
      const cnfrmpassword = document.getElementById('cnfrm-password').value;

      if (password.length != 0) {
        if (password == cnfrmpassword) {
          axios.post('/api/users/register', {
              username: regusername,
              email: regemail,
              password: regpassword,
            })
            .then(function (res) {
              if (res.data.message == 'Your account has been created successfully') {
                alert(res.data.message);
                window.location.href = '../';
              } else {
                alert(res.data.message);
              }
            })
            .catch(function (err) {
              console.log(err);
            });
        } else {
          alert('Your passwords do not match');
        }
      }
    }
  });
});
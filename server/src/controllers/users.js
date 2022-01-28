const router = require('express').Router();
const connection = require('../database/database');

// Get User By Id
router.get('/:id', async (req, res) => {
  try {
    const { id } = req.params;

    const query = `SELECT * FROM users WHERE id=${id}`;

    const result = await connection.query(query);
    if (!result)
      return res.status(404).json({
        error: `User ${id} Not Found!`,
      });

    return res.status(200).json({
      message: 'Retrieved profile successfully',
      result: result.rows[0],
    });
  } catch (e) {
    console.log({ e });
  }
});

router.put('/:id', function (req, res) {
  const id = req.params.id;
  const username = req.body.username;
  const email = req.body.email;
  const password = req.body.password;

  const updateUserQuery = {
    text: 'UPDATE users SET username=$1, email=$2, password=$3 WHERE id=$4;',
    values: [username, email, password, id],
  };

  connection.query(updateUserQuery, function (error, result) {
    if (error) {
      // console.log(error);
      res.status(500).json({
        error: 'Error while updating user',
      });
    } else {
      // console.log(result);
      if (result.rowCount === 1) {
        res.status(200).json({
          message: 'Updated user successfully',
        });
      } else {
        // console.log(error);
        res.status(404).json({
          error: `User not found`,
        });
      }
    }
  });
});

router.delete('/delete', function (req, res) {
  const deletename = req.query.username;
  const deletepw = req.query.password;

  const sql = 'DELETE FROM users WHERE username = ($1) and password = ($2)';
  const values = [deletename, deletepw];

  connection.query(sql, values, (error, result) => {
    if (error) {
      res.send(error);
    } else {
      if (result.rowCount == 0) {
        res.send({
          message: `Incorect Credentials`,
        });
      } else {
        res.send({
          message: `User ${deletename} has been deleted`,
        });
      }
    }
  });
});

module.exports = router;

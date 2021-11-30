const router = require('express').Router();
const connection = require('../database/database');

// Update specific user
// GET user profile
router.get('/getUsers/:username', function (req, res) {
    var username = req.params.username;

    const getUsersQuery = {
        text: 'SELECT * FROM users WHERE username = $1;',
        values: [username],
    };

    connection.query(getUsersQuery, function (error, result) {
        if (error) {
            // console.log(error);
            res.status(500).json({
                error: 'Error while retrieving profile'
            });
        } else {
            if (result) {
                // console.log(result);
                res.status(200).json({
                    message: 'Retrieved profile successfully',
                    result: result.rows
                });
            } else {
                // console.log(error);
                res.status(404).json({
                    error: `Profile not found`
                });
            }
        }
    });
});
module.exports = router;
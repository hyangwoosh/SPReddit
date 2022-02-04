const router = require('express').Router();
const connection = require('../database/database');

// Create genre
router.post('/genres', function (req, res) {
    const genreName = req.body.genreName;

    const addGenreQuery = {
        text: 'INSERT INTO genre (genre_name) VALUES ($1);',
        values: [genreName],
    };

    connection.query(addGenreQuery, function (error, result) {
        if (error) {
            // console.log(error);
            res.status(400).json({
                error: 'Error while adding genre',
            });
        } else {
            // console.log(result);
            res.status(200).json({
                message: 'Added genre successfully',
            });
        }
    });
});

// Retrieve all genres
router.get('/genres', function (req, res) {
    const getGenresQuery = {
        text: 'SELECT * FROM genre;',
    };

    connection.query(getGenresQuery, function (error, result) {
        if (error) {
            // console.log(error);
            res.status(500).json({
                error: 'Error while retrieving genres',
            });
        } else {
            if (result) {
                // console.log(result);
                res.status(200).json({
                    message: 'Retrieved genres successfully',
                    result: result.rows,
                });
            } else {
                // console.log(error);
                res.status(404).json({
                    error: 'Genres not found',
                });
            }
        }
    });
});

// Retrieve genre by ID
router.get('/genres/:genreID', function (req, res) {
    const genreID = req.params.genreID;

    const getGenreByIDQuery = {
        text: 'SELECT * FROM genres WHERE genre_id=$1;',
        values: [genreID],
    };

    connection.query(getGenreByIDQuery, function (error, result) {
        if (error) {
            // console.log(error);
            res.status(500).json({
                error: 'Error while retrieving genre',
            });
        } else {
            if (result.rowCount === 1) {
                // console.log(result);
                res.status(200).json({
                    message: 'Retrieved genre successfully',
                    result: result.rows,
                });
            } else {
                // console.log(error);
                res.status(404).json({
                    error: 'Genre not found',
                });
            }
        }
    });
});

// Update genre
router.put('/genres/:genreID', function (req, res) {
    const genreID = req.params.genreID;
    const genreName = req.body.genreName;

    const updateGenreQuery = {
        text: 'UPDATE genres SET genre_name=$1 WHERE genre_id=$2;',
        values: [genreName, genreID],
    };

    connection.query(updateGenreQuery, function (error, result) {
        if (error) {
            // console.log(error);
            res.status(500).json({
                error: 'Error while updating genre',
            });
        } else {
            // console.log(result);
            if (result.rowCount === 1) {
                res.status(200).json({
                    message: 'Updated genre successfully',
                });
            } else {
                // console.log(error);
                res.status(404).json({
                    error: 'Genre not found',
                });
            }
        }
    });
});

// Delete genre
router.delete('/genre/:genreID', function (req, res) {
    const genreID = req.params.genreID;

    const deleteGenreQuery = {
        text: 'DELETE FROM genres WHERE genre_id=$1;',
        values: [genreID],
    };

    connection.query(deleteGenreQuery, function (error, result) {
        if (error) {
            // console.log(error);
            res.status(400).json({
                error: 'Error while deleting genre',
            });
        } else {
            if (result.rowCount === 1) {
                // console.log(result);
                res.status(200).json({
                    message: 'Deleted genre successfully',
                });
            } else {
                // console.log(error);
                res.status(404).json({
                    error: 'Genre not found',
                });
            }
        }
    });
});

module.exports = router;
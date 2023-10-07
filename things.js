var express = require('express');
var router = express.Router();
var pool = require('./queries.js');

// This route for showing all films
router.get('/films', function (req, res) {
    pool.query('SELECT * FROM film', (err, result) => {
        if (err) {
            console.error(err); 
            res.status(500).json({ error: 'Internal Server Error' }); // Respond with an error message
        } else {
            res.json(result.rows); // Send the data as JSON
        }
    });
});

// This route for showing a film by id
router.get('/films/:film_id', function (req, res) {
    const filmId = req.params.film_id; // get film_id from request params
    pool.query('SELECT * FROM film WHERE film_id = $1', [filmId], (err, result) => {
        if (err) {
            console.error(err); 
            res.status(500).json({ error: 'Internal Server Error' });
        } else {
            if (result.rows.length === 0) {
                res.status(404).json({ error: 'Film tidak ditemukan' }); // Respon if no data
            } else {
                const filmData = result.rows[0];
                res.json(filmData); // Send the data as JSON
            }
        }
    });
});

// This route for showing all categories
router.get('/categories', function (req, res) {
    pool.query('SELECT * FROM category', (err, result) => {
        if (err) {
            console.error(err); 
            res.status(500).json({ error: 'Internal Server Error' }); // Respond with an error message
        } else {
            res.json(result.rows); // Send the data as JSON
        }
    });
});

module.exports = router;
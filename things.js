var express = require('express');
var router = express.Router();
var pool = require('./queries.js');

//error handling
function handleQueryError(err, res) {
    console.error(err);
    res.status(500).json({ error: 'Internal Server Error' }); //respon if error
}

// This route for showing all films
router.get('/films', function (req, res) {
    pool.query('SELECT * FROM film', (err, result) => {
        if (err) {
            handleQueryError(err, res);
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
            handleQueryError(err, res);
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
            handleQueryError(err, res);
        } else {
            res.json(result.rows); // Send the data as JSON
        }
    });
});

// This route for showing all films by category name
router.get('/films/category/:categoryName', function (req, res) {
    const categoryName = req.params.categoryName.toLowerCase(); // conversion to lowercase
    pool.query(
        'SELECT f.* ' +
        'FROM film f ' +
        'JOIN film_category fc ON f.film_id = fc.film_id ' +
        'JOIN category c ON fc.category_id = c.category_id ' +
        'WHERE LOWER(c.name) = $1', // use LOWER() to convert to lowercase
        [categoryName],
        (err, result) => {
            if (err) {
                handleQueryError(err, res);
            } else {
                res.json(result.rows);
            }
        }
    );
});

module.exports = router;
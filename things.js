var express = require('express');
var router = express.Router();
var pool = require('./queries.js');

router.get('/film', function (req, res) {
    // Gunakan koneksi pool untuk menjalankan query
    pool.query('SELECT * FROM film', (err, result) => {
        if (err) {
            console.error(err); // Log error to console for debugging
            res.status(500).json({ error: 'Internal Server Error' }); // Respond with an error message
        } else {
            res.json(result.rows); // Send the data as JSON
        }
    });
});

module.exports = router;
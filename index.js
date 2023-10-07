var express = require('express');
var app = express();

var things = require('./things.js');

app.use('/things', things);

app.listen(5000, () => {
    console.log(`Server berjalan di http://localhost:5000`);
});

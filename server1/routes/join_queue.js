var express = require('express');
var router = express.Router();
const sqlite3 = require('sqlite3').verbose();

//join queue
router.post('/', function(req, res, next) {


    //create queue entry
    let db = new sqlite3.Database('./supermarket.db', (err) => {
        if (err) {
            //console.error(err.message);
        }
        console.log('Connected to the supermarket database.');
    });




    db.run(`INSERT INTO queue(customer_id, queueTime, counter_assigned) VALUES(?, DATETIME('now'), 0)`, [req.body.id], function(err) {
        if (err) {
            return console.log(err.message);
        }
        // get the last insert id
        console.log(`new queue entry created with id ${this.lastID}`);
    });
});

module.exports = router;
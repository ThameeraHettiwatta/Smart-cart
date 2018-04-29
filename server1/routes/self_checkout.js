var express = require('express');
var router = express.Router();
const sqlite3 = require('sqlite3').verbose();

router.post('/', function(req, res, next) {

    //create a new bill
    let db = new sqlite3.Database('./supermarket.db', (err) => {
        if (err) {
            //console.error(err.message);
        }
        console.log('Connected to the supermarket database.');
    });


    db.run(`INSERT INTO bill(customer_id, date, status, amount, outlet, pay_method, self_check) VALUES(?, DATETIME('now'), 'shopping', 0, "keells rajagiriya", 'card', 1)`, [req.body.id], function(err) {
        if (err) {
            return console.log(err.message);
        }
        // get the last insert id
        console.log(`new bill created with id ${this.lastID}`);
        res.send(201, this.lastID);
    });
});

module.exports = router;
var express = require('express');
var router = express.Router();
const sqlite3 = require('sqlite3').verbose();

//remove item from cart
router.post('/', function(req, res, next) {

    //create entry in item table
    let db = new sqlite3.Database('./supermarket.db', (err) => {
        if (err) {
            //console.error(err.message);
        }
        console.log('Connected to the supermarket database.');
    });


    //check if the item already exists in the bill
    let sql = `SELECT qty qty FROM item WHERE bill_id =? and product_id=?`;

    db.all(sql, [req.body.bill, req.body.id], (err, rows) =>{
        if(err) {
            console.error(err.message);
        }
        else{

            if (rows.length!==0){


                //delete item from bill if it does exist
                db.run(`DELETE FROM item WHERE bill_id =? and product_id=?`, [req.body.bill, req.body.id], function(err) {
                    if (err) {
                        return console.error(err.message);
                    }
                    console.log(`Row(s) deleted: ${this.changes}`);
                    res.send(201, 'success');
                });
            }
            else{
                res.send(201, 'fail');
            }
        };
    });
});


module.exports = router;
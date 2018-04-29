var express = require('express');
var router = express.Router();
const sqlite3 = require('sqlite3').verbose();

//add item to cart
router.post('/', function(req, res, next) {

    //create entry in item table
    let db = new sqlite3.Database('./supermarket.db', (err) => {
        if (err) {
            //console.error(err.message);
        }
        console.log('Connected to the supermarket database.');
    });


    //check if the item already exists in the

    let sql = `SELECT qty qty FROM item WHERE bill_id =? and product_id=?`;

    db.all(sql, [req.body.bill, req.body.id], (err, rows) =>{
        if(err) {
            console.error(err.message);
        }
        else{
            if (rows==0){
                //add item if it doesnt exist
                db.run(`INSERT INTO item(bill_id, product_id, qty) VALUES(?, ?,  ?)`, [req.body.bill, req.body.id, req.body.qty], function(err) {
                    if (err) {
                        return console.log(err.message);
                    }
                    // get the last insert id
                    console.log(`new item created with id ${this.lastID}`);
                });

            }
            else{
                //update qantity if it does exist
                let sql = `UPDATE item
                            SET qty = ?
                            WHERE product_id = ?`;
                console.log(rows[0].qty+ parseInt(req.body.qty));
                db.run(sql, [rows[0].qty+parseInt(req.body.qty), req.body.id], function(err) {
                    if (err) {
                        return console.error(err.message);
                    }
                    console.log(`Row(s) updated: ${this.changes}`);

                });
            }

        };
    });
});



module.exports = router;

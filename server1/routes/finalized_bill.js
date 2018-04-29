var express = require('express');
var router = express.Router();
const sqlite3 = require('sqlite3').verbose();

router.get('/:id', function(req, res, next){
    items=[];

    let db = new sqlite3.Database('./supermarket.db', (err) => {
        if (err) {
            //console.error(err.message);
        }
        console.log('Connected to the supermarket database.');
    });
    let sql = `SELECT product_id product_id, qty qty FROM item WHERE bill_id =?`;
    var amount = 0;

    db.all(sql, [req.params.id], (err, rows) =>{
        if(err) {
            console.error(err.message);
        }
        else{
            rows.forEach((row) => {
                var quantity = row.qty;
                db.get(`SELECT name name, price price from product WHERE id=?`, [row.product_id], (err, row) =>{
                    var product_name = row.name;
                    var cost = row.price*quantity;
                    amount += cost;
                    items.push({name: product_name, qty:quantity, price:cost });
                });

            });
        }
    });
    db.close((err) => {
        if (err) {
            console.error(err.message);
        }
        console.log('Close the database connection.');
        res.render('finalize',{items:items, amount: amount});
    });

});


module.exports = router;
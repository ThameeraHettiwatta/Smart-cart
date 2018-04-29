var express = require('express');
var router = express.Router();
const sqlite3 = require('sqlite3').verbose();


//view bill
router.get('/:id', function(req, res, next){
    items=[];

    let db = new sqlite3.Database('./supermarket.db', (err) => {
        if (err) {
            //console.error(err.message);
        }
        console.log('Connected to the supermarket database.');
    });
    let sql = `SELECT product_id product_id, qty qty FROM item WHERE bill_id =?`;


    db.all(sql, [req.params.id], (err, rows) =>{
        if(err) {
            console.error(err.message);
        }
        else{
            rows.forEach((row) => {
                var quantity = row.qty;
                db.get(`SELECT name name from product WHERE id=?`, [row.product_id], (err, row) =>{
                    var product_name = row.name;
                    console.log('sdsd');
                    items.push({name: product_name, qty:quantity});
                });
                console.log(items);
            });
        }
    });
    db.close((err) => {
        if (err) {
            console.error(err.message);
        }
        console.log('Close the database connection.');
        res.render('bill',{items:items});
    });

});


module.exports = router;
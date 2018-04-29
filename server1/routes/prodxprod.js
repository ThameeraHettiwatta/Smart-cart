var express = require('express');
var router = express.Router();
const sqlite3 = require('sqlite3').verbose();
var async = require('async');

//build product x product relationships.
router.get('/', function(req, res, next){


    let db = new sqlite3.Database('./supermarket.db', (err) => {
        if (err) {
            //console.error(err.message);
        }
        console.log('Connected to the supermarket database.');
    });
    var amount = 0;



    db.all(`SELECT id id FROM product`, [], (err, rows) =>{
        if(err) {
            console.error(err.message);
        }
        else{
            rows.forEach((row) => {
                var id1 = row.id;
                db.all(`SELECT id id FROM product`, [], (err, rows) =>{
                    if(err) {
                        console.error(err.message);
                    }
                    else{
                        rows.forEach((row) => {
                            var id2 = row.id;
                            var count =0;

                            var asyncOps = [

                                function (done) {
                                    db.all(`SELECT bill_id bill_id FROM item where product_id=?`, [id1], (err, rows) =>{
                                        if(err) {
                                            console.error(err.message);
                                        }
                                        else{
                                            rows.forEach((row) => {
                                                var bill=row.bill_id;
                                                db.all(`SELECT product_id product_id FROM item where bill_id=? and product_id=?`, [bill, id2], (err, rows) =>{
                                                    if(err) {
                                                        console.error(err.message);
                                                    }
                                                    else{
                                                        rows.forEach((row) => {
                                                            count+=1;
                                                            console.log(count);

                                                        });
                                                    }
                                                });
                                            });
                                        }
                                     });
                                },
                                //count finishes at this point
                                //create a new entry in the product x product data table
                                function(count) {
                                    console.log(id2, count, id1);
                                    db.run(`INSERT INTO prod_x_prod_data(product_id, rel_product_id, connections) VALUES(?, ?,  ?)`, [id1, id2, count], function(err) {
                                        if (err) {
                                            return console.log(err.message);
                                        }
                                        console.log(`new connection created with id ${this.lastID}`);
                                    });
                                }
                            ];
                            async.waterfall(asyncOps, function (err, results){
                                if (err) return console.log(err);
                            });

                        });
                    }

                });

            });
        }
    });





});

module.exports = router;
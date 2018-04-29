var express = require('express');
var router = express.Router();
const sqlite3 = require('sqlite3').verbose();

router.get('/:id', function(req, res, next){
    product=[];
    relIDs=[];
    adIDs=[];
    ad=[];

    //writeProductData("Milo");

    //listen to firebase database



    let db = new sqlite3.Database('./supermarket.db', (err) => {
        if (err) {
            //console.error(err.message);
        }
        console.log('Connected to the supermarket database.');
    });

    db.serialize(()=>{


        //customer database connection
        let sql = `SELECT id id, name name, description description, image image, price price  FROM product WHERE id =?`;

        db.all(sql, [req.params.id], (err, rows) =>{
            if(err) {
                console.error(err.message);
            }
            else{
                rows.forEach((row) => {
                    console.log(row.name);
                    product.push(row);

                });
            }
        });


    //find related ads

        let sql5 = `SELECT ad_id ad_id FROM product_x_ad WHERE product_id =?`;
        db.all(sql5, [req.params.id], (err, rows) =>{
            if(err) {
                console.error(err.message);
            }
            else{
                rows.forEach((row) => {
                    adIDs.push(row.ad_id);
                });
            }
            //return related ads
            let sql4 = `SELECT img img FROM ad WHERE id =?`;
            db.all(sql4, [adIDs[0]], (err, rows) =>{
                console.log(adIDs[0]);
                if(err) {
                    console.error(err.message);
                }
                else{
                    rows.forEach((row) => {
                        console.log(row.img);
                        ad.push(row.img);
                     });
                }
            });
        });

        //find related product ids

        let sql2 = `SELECT rel_product_id rel_product_id  FROM prod_x_prod WHERE product_id =?`;
        db.all(sql2, [req.params.id], (err, rows) =>{
            if(err) {
                console.error(err.message);
            }
            else{
                rows.forEach((row) => {
                    relIDs.push(row.rel_product_id);
                });
            }
            //return related products
            let sql3 = `SELECT image image, name name, id id FROM product WHERE id =? or id =?`;
            db.all(sql3, [relIDs[0], relIDs[1]], (err, rows) =>{
                console.log(relIDs[1]);
                if(err) {
                    console.error(err.message);
                }
                else{
                    rows.forEach((row) => {
                        console.log(row.name);
                    });
                }
                res.render('product',{product:product[0], rel_prod:rows, ad:ad[0]});


            });

        });
    /*
    db.close((err) => {
      if (err) {
        console.error(err.message);
      }
      console.log('Close the database connection.');
        });*/
    });
});

module.exports = router;
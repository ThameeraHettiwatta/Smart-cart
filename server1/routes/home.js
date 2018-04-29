//homepage
var express = require('express');
var router = express.Router();
const sqlite3 = require('sqlite3').verbose();

router.get('/', function(req, res, next){
    var name ='';
    var priviledge='';
    //connect to database to retrieve user data
    let db = new sqlite3.Database('./supermarket.db', (err) => {
        if (err) {
            //console.error(err.message);
        }
        console.log('Connected to the supermarket database.');
    });

    db.serialize(()=>{


        //customer database connection
        let sql = `SELECT name name, phone_no phone_no, id id, priviledge priviledge FROM customer WHERE id =?`;

    db.all(sql, [req.query.id], (err, rows) =>{
        if(err) {
            console.error(err.message);
        }
        else{
            rows.forEach((row) => {
            name+=row.name;
            priviledge+=row.priviledge;
            console.log(name);
            console.log(priviledge);

            });
        }
    });
    //retreive ad ids
    let sql2 = 'SELECT ad_id ad_id from customer_x_ad WHERE customer_id =?';
    var adIds = [];

    db.all(sql2, [req.query.id], (err, rows) =>{
        if(err) {
            console.error(err.message);
        }
        else{
            let sql3 = 'SELECT img img from ad WHERE id =';
            rows.forEach((row) => {
                adIds.push(row.ad_id);
                sql3+=row.ad_id+' or id=';
            });
            var sql4=sql3.slice(0,-7);
            console.log(sql4);


            //retrieve ad urls

            var adURLs=[];
            console.log(adIds[0]);

            db.all(sql4, (err, rows) =>{
                if(err) {
                    console.error(err.message);
                }
                else{
                    rows.forEach((row) => {
                        adURLs.push(row.img);
                    });
                    console.log(adURLs);
                    console.log(rows[0].img);
                    console.log(req.query.id);
                    res.render('home',{name:name, id:req.query.id, priviledge:priviledge, adURLs:adURLs, row:rows});
                }
            })
        }

    })

    });
});

module.exports = router;
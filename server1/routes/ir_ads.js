var express = require('express');
var router = express.Router();
const sqlite3 = require('sqlite3').verbose();


//display IR beam ad
router.get('/:id', function(req, res, next){
    isle=[];

    let db = new sqlite3.Database('./supermarket.db', (err) => {
        if (err) {
            //console.error(err.message);
        }
        console.log('Connected to the supermarket database.');
    });
    let sql = `SELECT id id, isle_name isle_name, img img FROM beam WHERE id =?`;


    db.all(sql, [req.params.id], (err, rows) =>{
        if(err) {
            console.error(err.message);
        }
        else{
            console.log("CVB");
            rows.forEach((row)=> {
                isle.push(row);
            });
            res.render('beamAd', {isle:isle[0]});
        }

    });
});


module.exports = router;
var express = require('express');
var router = express.Router();
const sqlite3 = require('sqlite3').verbose();

//return checkout page
router.get('/:id', function(req, res, next){
    // PythonShell.run('ir_hasher.py', function (err) {
    //     if (err) throw err;
    //     console.log('finished');
    // });
    res.render('checkout',{bill: req.params.id});
})




//handle checkout verification
router.post('/', function(req, res, next){

    let db = new sqlite3.Database('./supermarket.db', (err) => {
        if (err) {
            //console.error(err.message);
        }
        console.log('Connected to the supermarket database.');
    });
    console.log(req.body.bill);
    console.log(req.body.id);
    var valid=false;
    status='invalid';
    let sql = `SELECT product_id product_id FROM item WHERE bill_id =?`;

    db.all(sql, [req.body.bill], (err, rows) =>{
        if(err) {
            console.error(err.message);
        }
        else{
            rows.forEach((row) => {
                if (row.product_id == req.body.id){
                    valid=true;
                    res.send(201, 'valid');
                }
            });
            if (!valid){
                res.send(201, 'invalid');
            }

        }


    });
});


module.exports = router;
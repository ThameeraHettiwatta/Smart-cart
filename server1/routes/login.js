var express = require('express');
var router = express.Router();
const sqlite3 = require('sqlite3').verbose();

/* GET login page. */
router.get('/', function(req, res, next){
    res.render('login',{status:req.query.status});
});

//handle login
router.post('/', function(req, res, next){

    let db = new sqlite3.Database('./supermarket.db', (err) => {
        if (err) {
            //console.error(err.message);
        }
        console.log('Connected to the supermarket database.');
    });
    console.log(req.body.mobile);
    let sql = `SELECT name name, phone_no phone_no, id id FROM customer WHERE phone_no =?`;

    db.all(sql, [req.body.mobile], (err, rows) =>{
        if(err) {
            console.error(err.message);
        }
        else{
            if (rows==0){
                res.redirect('/login/?status=error');
            }
            else{
                rows.forEach((row) => {
                    console.log(row.id);
                    console.log("thame");
                res.redirect('/home/?id='+row.id);
                });
            }
        }
    });
    /*
    db.close((err) => {
      if (err) {
          console.error(err.message);
      }
      console.log('Close the database connection.');
      });*/
});


module.exports = router;
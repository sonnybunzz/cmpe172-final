const express = require('express')
const router = express.Router()
const mysql = require('mysql');
const connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  password : '',
  database : 'employees'
});

/*connection.connect(function(err) {
  if (err) {
    console.error('error connecting: ' + err.stack);
    return;
  }

  console.log('connected as id ' + connection.threadId);
});*/

//exports.list = function(req,res){
router.get('/', function(req,res){
	connection.connect(function(err){
		if(err){
			console.error('error connecting: ' + err.stack);
			return;
		}
		console.log('connected as id ' + connection.threadId);
	})
	var query = connection.query('SELECT emp_no,first_name,last_name,hire_date FROM employees LIMIT 10', function(err,rows){
		if(err)
			console.log("Error selecting : %s ", err);
		console.log(rows);
		res.render('employee', {
			title: "Employee Database",
			userinfo: req.userinfo,
			data:rows
		});
	});
	//connection.end();
});

module.exports = router
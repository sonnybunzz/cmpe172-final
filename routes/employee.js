const express = require('express')
const router = express.Router()
const mysql = require('mysql');
const app = express();
const connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  password : '',
  database : 'employees'
});


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
});
/*
router.use('/add', function(req, res, next){
	//renders to views/add.hbs
	res.render('employee/add',{
		title: 'Add New User',
		fname: ' ',
		lname: ' '
	})
})

router.post('/add', function(req, res, next){
	req.assert('fname', 'First name is required').notEmpty()
	req.assert('lname', 'Last name is required').notEmpty()

	var errors = req.validationErrors()

	if(!errors){
		var employee = {
			fname: req.sanitize('fname').escape().trim(),
			lname: req.sanitize('lname').escape().trim()
		}
		req.getConnection(function(error, conn){
			conn.query('INSERT INTO employees SET ?', employee, function(err, result){
				if(err) {
					req.flash('error', err)
					res.render('employee/add', {
						title: 'Add New User',
						fname: employee.fname,
						lname: employee.lname
					})
					} else{
						req.flash('success', 'Data added successfully!')
						res.render('employee/add', {
							title: 'Add New User',
							fname: ' ',
							lname: ' '
						})
					}
				
			})
		})
	}
	else {
		var error_msg = ''
		errors.forEach(function(error){
			error_msg += error.msg + '<br>'
		})
		req.flash('error', error_msg)

		res.render('employee/add', {
			title: 'Add New User',
			fname: req.body.fname,
			lname: req.body.lname
		})
	}
})

router.delete('/delete/(:id)', function(req, res, next){
	var employee = { id: req.params.id }

	req.getConnection(function(error,conn) {
		conn.query('DELETE FROM employees WHERE id = ' +req.params.id, employee, function(err,results){
			if(err) {
				req.flash('error', err)
				res.redirect('/employee')
			}
			else {
				req.flash('success', 'User deleted successfully! id = ' + req.params.id)
				res.redirect('/employee')
			}
		})
	})
})*/
module.exports = router
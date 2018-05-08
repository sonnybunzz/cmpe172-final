const express = require('express');
const router = express.Router();
const mysql = require('mysql');
const path = require('path');
const connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  password : '',
  database : 'employees'
});
const {check,validationResult} = require('express-validator/check');
const {matchedData, sanitize} = require('express-validator/filter');


router.get('/', function(req,res){
	connection.connect(function(err){
		if(err){
			console.error('error connecting: ' + err.stack);
			return;
		}
		console.log('connected as id ' + connection.threadId);
	})
	var query = connection.query('SELECT emp_no,first_name,last_name,hire_date FROM employees ORDER BY emp_no DESC LIMIT 10', function(err,rows){
		if(err)
			console.log("Error selecting : %s ", err);
		//console.log(rows);
		res.render('employee', {
			title: "Employee Database",
			userinfo: req.userinfo,
			data:rows
		});
	});
});

router.get('/add', function(req,res,next){
	res.render('add' ,{
		title: 'Add new employee',
		userinfo: req.userinfo,
		emp_no: '',
		birth_day: '',
		first_name: '',
		last_name: '',
		gender: '',
		hire_date: ''
	})
})

router.post('/add',function(req,res,next){
	var input = req.body;
	var data = {
		emp_no : input.emp_no,
		birth_date : input.birth_date,
		first_name : input.first_name,
		last_name : input.last_name,
		gender : input.gender,
		hire_date : input.hire_date
	}
	connection.query('INSERT INTO employees SET ?', data, function(err,rows){
	if (err) 
		throw err;
		console.log("Error inserting: %s", err);
	res.redirect('/employee/add');
	})
})



router.get('/delete/(:id)', function(req, res, next){
	var employee = { id: req.params.id }
	console.log('hi' + req.params.id);
	connection.query('DELETE FROM employees WHERE emp_no = ' +req.params.id, employee, function(err, results){
		if(err)
			throw err;
		console.log("Error deleting: %s", err);
		res.redirect('/employee')
	})
})

/*
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
			conn.query('INSERT INTO employees SET( sort=(selectmax(h1.emp_no)+1 from employees h1),', employee, function(err, result){
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
							fname: '',
							lname: ''
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
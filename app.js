const express = require('express');
const path = require('path');
const routes = require('./routes');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const exphbs = require('express-handlebars');
const session = require('express-session');
const { ExpressOIDC } = require('@okta/oidc-middleware');
const bodyParser = require('body-parser');
var expressValidator = ('express-validator');
const methodOverride = require('method-override');
//const mysql = require('mysql');
const flash = require('express-flash');

const indexRouter = require('./routes/index');
const dashboardRouter = require('./routes/dashboard');
const employee = require('./routes/employee');


const app = express();


//app.use(expressValidator())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())

app.use(methodOverride(function (req,res){
	if(req.body && typeof req.body == 'object' && '_method' in req.body) {
		var method = req.body._method
		delete req.body._method
		return method
	}
}))

//mysql setup
/*const connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  password : '',
  database : 'employees'
});

connection.connect(function(err) {
  if (err) {
    console.error('error connecting: ' + err.stack);
    return;
  }

  console.log('connected as id ' + connection.threadId);
});

connection.query('SELECT emp_no,first_name,last_name,hire_date FROM employees', (err, rows) =>
{
	if(err) throw err;
	console.log('Data received from Db:\n');
	console.log(rows);
})
*/
const oidc = new ExpressOIDC({
  issuer: `${process.env.ORG_URL}/oauth2/default`,
  client_id: process.env.CLIENT_ID,
  client_secret: process.env.CLIENT_SECRET,
  redirect_uri: `${process.env.HOST_URL}/authorization-code/callback`,
  scope: 'openid profile',
})

// view engine setup
var hbs = exphbs.create({
	extname: 'hbs',
	layoutsDir: './views/layout',
	defaultLayout: 'layout'
})
app.engine('.hbs', exphbs({extname: '.hbs'}));
app.set('view options', {layout: 'layout'});
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');
app.use(session({
	secret: process.env.APP_SECRET,
	resave: true,
	saveUninitialized: false,
}));
app.use(oidc.router);

//flash module

 
app.use(cookieParser('keyboard cat'))
app.use(session({ 
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: true,
    cookie: { maxAge: 60000 }
}))
app.use(flash()) 

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname + '/../public')));

app.use('/', indexRouter);
app.use('/dashboard', oidc.ensureAuthenticated(), dashboardRouter);
app.get('/logout', (req, res) => {
	req.logout()
	res.redirect('/')
})
app.use('/employee', oidc.ensureAuthenticated(), employee);


// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});


module.exports = { app, oidc };

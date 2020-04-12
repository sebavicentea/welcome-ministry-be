const express = require('express');
const rateLimit = require('express-rate-limit');
const helmet = require('helmet');
const cors = require('cors');




const globalErrHandler = require('./services/error.service');
const AppError = require('./utils/appError.js');
const app = express();
const session  = require('express-session');
const passport= require('passport');

require('./utils/passport')(passport); // pass passport for configuration

const guestRoutes = require('./routes/guests-routes');

// Allow Cross-Origin requests
app.use(cors());

// Set security HTTP headers
app.use(helmet());

// Limit request from the same API 
const limiter = rateLimit({
    max: 150,
    windowMs: 60 * 60 * 1000,
    message: 'Too Many Request from this IP, please try again in an hour'
});

app.use('/api', limiter);


// Body parser, reading data from body into req.body
app.use(express.json({
    limit: '15kb'
}));

app.use(session({
	secret: process.env.PASSPORT_SECRET,
	resave: true,
	saveUninitialized: true
 } )); // session secret
app.use(passport.initialize());
app.use(passport.session());

// Routes
// app.use('/', authRoutes);
require('./routes/auth-routes')(app,passport);
app.use('/api/', guestRoutes);


// handle undefined Routes
app.use('*', (req, res, next) => {
    const err = new AppError(404, 'fail', 'undefined route');
    next(err, req, res, next);
});

app.use(globalErrHandler);



module.exports = app;
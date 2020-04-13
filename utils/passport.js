// config/passport.js

// load all the things we need
const LocalStrategy   = require('passport-local').Strategy;
const db = require('../utils/db');
const bcrypt = require('bcrypt-nodejs');

// expose this function to our app using module.exports
module.exports = function(passport) {

    // =========================================================================
    // passport session setup ==================================================
    // =========================================================================
    // required for persistent login sessions
    // passport needs ability to serialize and unserialize users out of session

    // used to serialize the user for the session
    passport.serializeUser(function(user, done) {
        done(null, user);
    });

    // used to deserialize the user
    passport.deserializeUser(function(user, done) { 
        
        db.connection.query(`SELECT * FROM users WHERE id=${user.id}`,function(err, rows){
            console.log(rows);
            done(err, rows[0]);
        });
        db.connectionRelease;
    });

    // =========================================================================
    // LOCAL SIGNUP ============================================================
    // =========================================================================
    // we are using named strategies since we have one for login and one for signup
    // by default, if there was no name, it would just be called 'local'

    passport.use(
        'local-signup',
        new LocalStrategy({
            // by default, local strategy uses username and password, we will override with email
            usernameField : 'email',
            passwordField : 'password',
            passReqToCallback : true // allows us to pass back the entire request to the callback
        },
        function(req, email, password, done) {
            // find a user whose email is the same as the forms email
            // we are checking to see if the user trying to login already exists
            // db.connection.connect();
            db.connection.query("SELECT * FROM users WHERE email = ?",[email], function(err, rows) {
                if (err)
                    return done(err);
                if (rows.length) {
                    return done(null, false, emailUsed);
                } else {
                    // if there is no user with that username
                    // create the user
                    var newUserMysql = {
                        email: email,
                        password: bcrypt.hashSync(password, null, null),  
                        name: req.body.name,
                        lastname: req.body.lastname,
                        phoneNumber: req.body.phoneNumber,
                        churchId: req.body.churchId
                    };

                    var insertQuery = `CALL AddNewUser("${newUserMysql.email}","${newUserMysql.password}","${newUserMysql.name}","${newUserMysql.lastname}","${newUserMysql.phoneNumber}",${newUserMysql.churchId})`;
                    db.connection.query(insertQuery,function(err, rows) {
                        newUserMysql.id = rows[0][0].id;
                        return done(null, newUserMysql);
                    });
                    db.connectionRelease;
                }
            });
            db.connectionRelease;

        })
    );

    // =========================================================================
    // LOCAL LOGIN =============================================================
    // =========================================================================
    // we are using named strategies since we have one for login and one for signup
    // by default, if there was no name, it would just be called 'local'

    passport.use(
        'local-login',
        new LocalStrategy({
            // by default, local strategy uses username and password, we will override with email
            usernameField : 'email',
            passwordField : 'password',
            passReqToCallback : true // allows us to pass back the entire request to the callback
        },
        function(req, email, password, done) { // callback with email and password from our form
            db.connection.query("SELECT * FROM users WHERE email = ?",[email], function(err, rows){
                if (err)
                    return done(err);
                if (!rows.length) {
                    return done(null, false, invalidCredentials); 
                }
                console.log('user found', rows[0])
                // if the user is found but the password is wrong
                if (!bcrypt.compareSync(password, rows[0].password))
                    return done(null, false, invalidCredentials); // create the loginMessage and save it to session as flashdata

                   
                // all is well, return successful user
                return done(null, rows[0]);
            });
            db.connectionRelease;
        })
    );
};

const emailUsed =  {
    code: 'E_EMAIL_ALREADY_USED',
    message: 'The email is already used',
    status: 401
  }

const invalidCredentials = {
  code: 'E_INVALID_CREDENTIALS',
  message: 'Invalid credentials',
  status: 401
}
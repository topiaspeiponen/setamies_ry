'use strict';
const pool = require('./database/db');
const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcryptjs');

const promisePool = pool.promise();


function initialize(passport, getUserByEmail, getUserById) {
    const authenticateUser = async (email, password, done) => {
        const error = "wrong credential";
        console.log("AuthenticateUser email, password and done: " + email, password, done);
        try {
            const [row] = await promisePool.execute(
                'SELECT * FROM user WHERE email = ?',
                [email]
            );
            if(row[0] === undefined) {
                return done(null, false, {message: error});
            }
            console.log("SQL query result for authentication: ", row[0].username, row[0].password);
            const user = row[0];
            if (await bcrypt.compare(password, user.password)) {
                delete user.password;
                let userid = user.id;
                localStorage.setItem("userid", userid);
                return done(null, user);
            } else {
                return done(null, false, {message: error});
            }
        } catch(e) {
            console.log(e);
            //return done(null, false, {message: 'No user with that email!'});
            return done(null, false, {message: error});
        }
    };

    passport.use(new LocalStrategy({ usernameField: 'email' },
        authenticateUser));
    passport.serializeUser((user, done) => done(null, user.email));
    passport.deserializeUser((email, done) => {
        return done(null, getUserByEmail(email));
    });
 }

 module.exports = initialize;
'use strict';
const pool = require('./database/db');
const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcryptjs');

const promisePool = pool.promise();

function initialize(passport, getUserByEmail) {
    const authenticateUser = async (email, password, done) => {
        //TODO Login doesn't work yet, illegal arguments, undefined. Check arguments from which the sql query is made
        let user;
        try {
            const [row] = await promisePool.query(
                'SELECT * FROM user WHERE email = ?',
                [email]
            );
            user = [row];
            console.log("Authenticate user: " + user);
            console.log(user.password)
        } catch(e) {
            return done(null, false, {message: 'No user with that email!'});
        }

        try {
            if (await bcrypt.compare(password, user.password)) {
                return done(null, user);
            } else {
                return done(null, false, {message: 'Password incorrect'})
            }
        } catch (e) {
            return done(e);
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
'use strict';
const dotenv = require('dotenv').config();
const express = require('express');
const cors = require('cors');
const app = express();
const port = 3000;
//Login stuff
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const session = require('express-session');
const usermodel = require('./model/usermodel');

app.use(express.json()); // for parsing application/json
app.use(express.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded

//DEFINE ALL CONFIGS BEFORE ROUTES
const listing = require("./routes/listingRoute");


app.use(cors());
app.use('/listings', listing);

app.listen(port, () => console.log(`Project app listening on port ${port}!`));

app.use(require('express-session')({
    secret: 'keyboard cat',
    resave: true,
    saveUninitialized: true }));

passport.use(new LocalStrategy(
    (username, password, done) => {
        console.log('login', username);

        usermodel.findUser(SELECT * from wop_user where username = ?, [username]);
        //$2a$12$yxtfBXmWiB.EUTddHYiaaOS1kwAIqh7h5qDd8mwbJ346xcd1ZKTuW
        if(username !== 'test' || !bcrypt.compareSync(password, '$2a$12$yxtfBXmWiB.EUTddHYiaaOS1kwAIqh7h5qDd8mwbJ346xcd1ZKTuW')) {
            console.log('login', 'wrong username or password');
            return done(null, false);
        }
        return done(null, {username: username});
        /*User.findOne({ sername: username }, function (err, user) {
          if (err) { return done(err); }
          if (!user) { return done(null, false); }
          if (!user.verifyPassword(password)) { return done(null, false); }
          return done(null, user);
        });*/
    }
));

passport.serializeUser((user, done) => {
    done(null, user.username);
});

passport.deserializeUser((username, done) => {
    /*User.findById(id, function (err, user) {
          done(err, user);
        });*/
    done(null, {username: username});
});

app.use(passport.initialize());
app.use(passport.session());

app.post('/login',
    passport.authenticate('local', { failureRedirect: '/login' }),
    (req, res) => {
        res.redirect('/home.html');
    });

app.post('/register', (req, res) => {
    const salt = bcrypt.genSaltSync(12);
    const hash = bcrypt.hashSync(req.body.password, salt);
    // insert into user (name, email, password) values (?, ?, ?), [req.body.name, req.body.email, hash]
    console.log('NEVER DO THAT', hash);
    res.send('account successfully created ☺');
});
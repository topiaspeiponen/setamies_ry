'use strict';
const pool = require('./database/db');
const promisePool = pool.promise();
const dotenv = require('dotenv').config();
const express = require('express');
const session = require('express-session');
const bcrypt = require('bcryptjs');
const app = express();
const cors = require('cors');
const port = 3000;
const passport = require('passport');
const flash = require('express-flash');
const methodOverride = require('method-override');
const initializePassport = require('./passport-config');
const listing = require("./routes/listingRoute");

let users = [];
allUsers();

initializePassport(
    passport,
    email => users.find(user => user.email === email),
    id => users.find(user => user.id === id)
);


app.use(express.static("views"));
app.use(express.static("public_html"));
app.set('view-engine', 'ejs');
app.use(cors());
app.use(express.urlencoded({extended: false}));
app.use(flash());
app.use(session({
    secret: "SECRET",
    resave: false,
    saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());
app.use(methodOverride('_method'));
app.use('/listings', listing);



app.get("/home", (req, res) => {
    res.sendFile("./public_html/home.html", { root: __dirname })
});
app.get("/account", (req, res) => {
    res.sendFile("./public_html/account.html", { root: __dirname })
});
app.get("/listing", (req, res) => {
    res.sendFile("./public_html/listing.html", { root: __dirname })
});

app.get('/', checkAuthenticated, (req, res) => {
    res.render('index.ejs', {name: req.user.name});
});

app.get('/login', checkNotAuthenticated, (req, res) => {
    res.render('login.ejs')
});
app.post('/login', checkNotAuthenticated, passport.authenticate('local', {
    successRedirect: '/',
    failureRedirect: '/login',
    failureFlash: true
}));

app.get('/register', checkNotAuthenticated, (req, res) => {
    res.render('register.ejs')
});

app.post('/register', checkNotAuthenticated, async (req, res, params) => {
    try {
        const hashedPassword = await bcrypt.hash(req.body.password, 10);
        console.log(params);
        const [rows] = await promisePool.execute(
            'INSERT INTO user (username, email, phone, password) VALUES (?, ?, ?, ?);',
          [
        req.body.name,
            req.body.email,
            req.body.phone,
            hashedPassword,
        ]
        );
        console.log(rows);
        res.redirect('/login');
        return rows;
    } catch (e) {
        console.log(e);
        res.redirect('/register');
    }
    console.log(users);
});

app.delete('/logout', (req, res) => {
    req.logOut();
    res.redirect('/login')
});

function checkAuthenticated(req, res, next) {
    if (req.isAuthenticated()) {
        return next()
    }
    res.redirect('/login');
}

function checkNotAuthenticated(req, res, next) {
    if (req.isAuthenticated()) {
        return res.redirect('/')
    }
    return next()
}
async function allUsers() {
    try {
        const [row] = await promisePool.execute(
            'SELECT * FROM user'
        );
        row.forEach(user => {
            users.push({
                id: user.id,
                username: user.username,
                email: user.email,
                phone: user.phone
            });
        });
    } catch(e) {
        console.log(e);
    }
}

app.listen(port, () => console.log(`Project app listening on port ${port}!`));






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

//Getting all the current users and pushing them to the users array (registering a new user requires server restart ":-D"
let users = [];
allUsers();

//Initialization for logging in
initializePassport(
    passport,
    email => users.find(user => (user.email === email)),
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
    saveUninitialized: false,
 }));
app.use(passport.initialize());
app.use(passport.session());
app.use(methodOverride('_method'));
app.use('/listings', listing);
app.use(function(req,res,next){
    res.locals.currentUser = req.user;
    next();
});
//Serve the uploads folder for use with the listings
app.use("/uploads", express.static("uploads"));



// Home page route
app.get("/home", checkNotAuthenticated, (req, res) => {
    res.sendFile("./public_html/home.html", { root: __dirname })
});

// Home page route for logged in users
app.get("/home_user", checkAuthenticated, (req, res) => {
    res.sendFile("./public_html/home-user.html", { root: __dirname })
});

// Account page route
app.get("/account", checkAuthenticated, (req, res) => {
    res.render('index.ejs')
});

// Listing page route
app.get("/listing", checkAuthenticated, (req, res) => {
    res.sendFile("./public_html/listing.html", { root: __dirname })
});

//Get likes from database
app.get("/like/:id", checkAuthenticated, async(req, res) => {
    let like;
    console.log(req.params.id);
    try {
        like = promisePool.execute(
            'SELECT card.like WHERE id = ?',
            [req.params.id]
        )
    } catch(e) {
        console.log(e);
    }
    console.log("like route: " + like);
    like +=1;
    try {
        await promisePool.execute(
            'UPDATE card SET like = ? WHERE id = ?',
            [like, req.params.id]
        )
    } catch(e) {
        console.log(e);
    }
});

// Route when opening the site with default url if you're logged in routes to home page for users
app.get('/', checkAuthenticated, (req, res) => {
    res.redirect('/home_user')
});

// Login page route
app.get('/login', checkNotAuthenticated, (req, res) => {
    res.render('login.ejs')
});

// Login post route
app.post('/login', checkNotAuthenticated, passport.authenticate('local', {
    successRedirect: '/home_user',
    failureRedirect: '/login',
    failureFlash: true
}));

// Register page route
app.get('/register', checkNotAuthenticated, (req, res) => {
    res.render('register.ejs')
});

//Password change request path
app.post('/account', async (req, res) => {
    try {
        const hashedpassword = await bcrypt.hash(req.body.password, 10);
        console.log(hashedpassword);
        const [rows] = await promisePool.execute(
            'UPDATE user SET password = ? WHERE id = ?',
            [
                req.body.password,
                "beibonen",
            ]
        );
        console.log(rows);
        res.redirect('/account');
        return rows;
    } catch (e) {
        console.log(e);
        res.redirect('/account');
    }
    console.log(users);
});

//New user registration path
app.post('/register', checkNotAuthenticated, async (req, res) => {
    try {
        const hashedPassword = await bcrypt.hash(req.body.password, 10);
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
        allUsers();
        return rows;
    } catch (e) {
        console.log(e);
        res.redirect('/register');
    }
    console.log(users);
});

// Logout route
app.delete('/logout', (req, res) => {
    req.logOut();
    res.redirect('/login')
});

// Function to check if you're logged in
function checkAuthenticated(req, res, next) {
    if (req.isAuthenticated()) {
        return next()
    }
    res.redirect('/home');
}

// Function to check that you're logged in
function checkNotAuthenticated(req, res, next) {
    if (req.isAuthenticated()) {
        return res.redirect('/home')
    }
    return next()
}

// async function to get all the current users in db
async function allUsers() {
    try {
        const [row] = await promisePool.execute(
            'SELECT * FROM user'
        );
        users = [];
        row.forEach(user => {
            console.log("email: " + user.email);
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
module.exports = {
    checkAuthenticated,
    checkNotAuthenticated,
};
app.listen(port, () => console.log(`Project app listening on port ${port}!`));






'use strict';
const dotenv = require('dotenv').config();
const express = require('express');
const session = require('express-session');
const bcrypt = require('bcrypt');
const app = express();
const port = 3000;

const listing = require("./routes/listingRoute");
app.use('/listings', listing);

app.set('view-engine', 'ejs');
app.use(express.urlencoded({extended: false}));

app.get('/', (req, res) => {
    res.render('index.ejs', {name: "Kyle"});
    });

app.get('/login', (req, res) => {
    res.render('login.ejs')
});
app.post('/login', (req, res) => {

});

app.get('/register', (req, res) => {
    res.render('register.ejs')
});

app.post('/register', (req, res) => {

});

app.listen(port, () => console.log(`Project app listening on port ${port}!`));





/*
const passport = require('passport');
const flash = require('connect-flash');

app.use(express.json()); // for parsing application/json
app.use(express.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded

//DEFINE ALL CONFIGS BEFORE ROUTES

const login = require("./routes/loginRoutes");


app.use(morgan('dev'));
app.use(cookieParser());
app.use(bodyParser.urlencoded({
    extended: true
}));

app.set('view engine', 'html');

app.use(session({
    secret: 'justasecret',
    resave:true,
    saveUninitialized: true
}));

app.use(passport.initialize());
app.use(passport.session());
app.use(flash());
app.use('/login', login);

require('./routes/loginRoutes')(app, passport);
app.use(cors());*/
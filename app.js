'use strict';
const dotenv = require('dotenv').config();
const express = require('express');
const session = require('express-session');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const cors = require('cors');
const app = express();
const port = 3000;

const passport = require('passport');
const flash = require('connect-flash');

app.use(express.json()); // for parsing application/json
app.use(express.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded

//DEFINE ALL CONFIGS BEFORE ROUTES
const listing = require("./routes/listingRoute");
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
app.use(cors());
app.use('/listings', listing);

app.listen(port, () => console.log(`Project app listening on port ${port}!`));
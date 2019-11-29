'use strict';
const dotenv = require('dotenv').config();
const express = require('express');
const cors = require('cors');
const app = express();
const port = 3000;

app.use(express.json()); // for parsing application/json
app.use(express.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded

//DEFINE ALL CONFIGS BEFORE ROUTES
const listing = require("./routes/listingRoute");


app.use(cors());
app.use('/listings', listing);

app.listen(port, () => console.log(`Project app listening on port ${port}!`));

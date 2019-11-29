'use strict';
//
const express = require('express');
const router = express.Router();
const listingController = require("../controllers/listingController");

router.use(function timeLog (req, res, next) {
    console.log('Time: ', Date.now());
    next()
});

router.get("/", listingController.listing_get_all);

module.exports = router;
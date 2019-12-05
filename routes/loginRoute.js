'use strict';

const express = require('express');
const router = express.Router();
const loginController = require("../controllers/loginController");

router.use(function timeLog (req, res, next) {
    console.log('Time: ', Date.now());
    next()
});

router.get("/", loginController.listing_get_all);

router.get("/login",);

router.post("/login",);


module.exports = router;
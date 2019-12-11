'use strict';
//Routes for listing actions
const express = require('express');
const router = express.Router();
const multer  = require('multer');
const upload = multer({ dest: './uploads/' });
const listingController = require("../controllers/listingController");

router.use(function timeLog (req, res, next) {
    console.log('Time: ', Date.now());
    next()
});

router.get("/", listingController.listing_get_all);

router.post("/", upload.single('picture') ,listingController.listing_post);

module.exports = router;
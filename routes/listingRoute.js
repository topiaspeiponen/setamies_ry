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

router.get("/:id", async(req, res) => {
    await listingController.listing_get_certain(req.params.id);
    res.send(users_listings);
});

module.exports = router;
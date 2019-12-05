'use strict';

const listingModel = require('../model/listingModel');

const listing_get_all = async(req, res) => {
    //res.json(users);
    const listings = await listingModel.getAllListings();
    console.log(listings);
    res.send(listings);
};

module.exports = {
    listing_get_all
};
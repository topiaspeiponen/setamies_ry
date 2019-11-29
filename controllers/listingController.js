'use strict';

const listingModel = require('../model/listingModel');


const listings = listingModel.users;

const listing_get_all = async(req, res) => {
    //res.json(users);
    const listings = await listingModel.getAllListings();
    console.log(listings);
    res.json(listings);
};

module.exports = {
    listing_get_all
};
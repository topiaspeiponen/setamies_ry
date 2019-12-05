'use strict';

const listingModel = require('../model/listingModel');

//Get all listings in the database
const listing_get_all = async(req, res) => {
    //res.json(users);
    const listings = await listingModel.getAllListings();
    console.log(listings);
    res.send(listings);
};

//Get only a certain user's listings
const listing_get_certain = async(user_id) => {
    const users_listings = await listingModel.getUsersListings(user_id);
    console.log(users_listings);
    res.send(users_listings);
    return users_listings
};

module.exports = {
    listing_get_all,
    listing_get_certain
};
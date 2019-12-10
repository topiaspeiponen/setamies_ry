'use strict';

const listingModel = require('../model/listingModel');

const listing_get_all = async(req, res) => {
    //res.json(users);
    const listings = await listingModel.getAllListings();
    console.log(listings);
    res.send(listings);
};

const listing_post = async(req, res) => {
    console.log(res.id);
    console.log(req.locals);
    console.log("stuff: " + req.session.id.user, req.body.name, req.file.originalname, req.body.description,
        req.body.price, req.body.phone, req.body.email, req.body.location);
    await listingModel.postListing(req.user, req.body.name, req.file.filename, req.body.description,
        req.body.price, req.body.phone, req.body.email, req.body.location);
    res.redirect("/listing");
};

module.exports = {
    listing_get_all,
    listing_post
};
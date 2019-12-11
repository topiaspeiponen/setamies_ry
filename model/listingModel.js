'use strict';

const pool = require('../database/db');
const promisePool = pool.promise();

// Getting all listings from database
const getAllListings = async() => {
    try {
        const [rows] = await promisePool.query(
            'SELECT * FROM card'
        );
        return rows;
    } catch(e) {
        console.log('error', e.message);
    }
};

// Posting new listings
const postListing = async(user_id, name, picture, description, price, phone, email, location) => {
    try {
        await promisePool.query(
            'INSERT INTO card (`user_id`, `name`, `picture`, `description`, `like`, `price`, `phone`, `email`, `location`)' +
            ' VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)',
            [5, name, picture, description, 0, price, phone, email, location]
        )
    } catch(e) {
        console.log('error', e.message);
    }
};

// Getting users listings
const getUsersListings = async(user_id) => {
    try {
        const [rows] = await promisePool.query(
            'SELECT * FROM card'
        );
        return rows;
    } catch(e) {
        console.log('error', e.message);
    }
};

module.exports = {
    getAllListings,
    getUsersListings,
    postListing
};
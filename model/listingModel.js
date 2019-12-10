'use strict';

const pool = require('../database/db');
const promisePool = pool.promise();

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

const postListing = async(user_id, name, picture, description, price, phone, email, location) => {
    try {
        await promisePool.query(
            'INSERT INTO card VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)',
            [0, user_id, name, picture, description,  price, phone, email, location]
        )
    } catch(e) {
        console.log('error', e.message);
    }
};

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
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

module.exports = {
    getAllListings
};
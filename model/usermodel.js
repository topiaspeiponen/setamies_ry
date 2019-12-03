'use strict';
const pool = require('../database/db');
const promisePool = pool.promise();


const getUser = async () => {
    try{
        const [rows] = await promisePool.execute(
            'SELECT username, password'
        )
    }
}
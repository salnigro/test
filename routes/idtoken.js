const express = require('express');

const router = express.Router();


const { Pool } = require('pg');

const pool = new Pool({

    connectionString: process.env.DATABASE_URL

        || 'postgresql://postgres:Pokemon10@localhost:5432/mydb',

    ssl: process.env.DATABASE_URL ? true : false

})


router.post('/', async (req, res, next) => {

    const payload = req.payload


    try {

        const insert = 'INSERT INTO users(userid, given_name, family_name, imageurl, email) '

            + 'VALUES($1, $2, $3, $4, $5) '

            + 'ON CONFLICT(userid) DO NOTHING';

        const values = [payload.sub, payload.given_name, payload.family_name, payload.picture, payload.email]

       

        const client = await pool.connect()

        const result = await client.query(insert, values)

        const results = { 'results' : (result) ? result.rows : null }

        console.log(results);

        res.send(results)

        client.release()

    } catch(err) {

        console.log(err)

        res.status(204).send("Error " + err)

    }

})


module.exports = router;
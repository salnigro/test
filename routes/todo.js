const express = require('express');
const router = express.Router();

const { Pool } = require('pg');
const pool = new Pool({
    connectionString: process.env.DATABASE_URL
        || 'postgresql://postgres:Pokemon10@localhost:5432/mydb',
    ssl: process.env.DATABASE_URL ? true : false
})

router.get('/', async (req, res, next) => {
    const payload = req.payload
    
    try {
        const select = 'SELECT * FROM todo WHERE userid = $1'
        const values = [req.payload.sub]
        const client = await pool.connect()
        const result = await client.query(select, values)
        const results = { 'results' : (result) ? result.rows : null }
        res.send(results)
        client.release()
    } catch(err) {

        console.log(err)

        res.status(204).send("Error " + err)

    }

})


module.exports = router;
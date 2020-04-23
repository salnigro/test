const express = require('express');
const router = express.Router();

router.post('/',(req, res, next) => {
    const payload = req.payload;
    res.sendStatus(201);
});


module.exports = router;
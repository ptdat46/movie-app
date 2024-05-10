const express = require("express");
const router = express.Router();
const axios = require('axios');
const connection = require('../connect');
const { loadSource} = require('../controllers/watch')

router.post('/:id', loadSource)

module.exports = router;
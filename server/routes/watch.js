const express = require("express");
const router = express.Router();
const axios = require('axios');
const connection = require('../connect');
const { loadSource, updateSource} = require('../controllers/watch')

router.post('/:id', loadSource)
router.post('/:id/update', updateSource)

module.exports = router;
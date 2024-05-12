const express = require("express");
const router = express.Router();
const axios = require('axios');
const {usersList, Delete} = require('../controllers/admin');

router.get("/admin", usersList);
router.post("/admin", Delete);

module.exports = router;
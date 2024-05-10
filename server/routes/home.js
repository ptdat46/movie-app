const express = require("express");
const router = express.Router();
const auth = require('../controllers/home')

// Home page route.
router.post("/", auth);

module.exports = router;
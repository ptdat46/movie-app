const express = require("express");
const router = express.Router();
const auth = require('../controllers/home')

// Home page route.
router.post("/home", auth);

module.exports = router;
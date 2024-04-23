const express = require("express");
const router = express.Router();

// Home page route.
router.get("/home", function (req, res) {
  res.json({"name": "pham tuan dat"});
});

module.exports = router;
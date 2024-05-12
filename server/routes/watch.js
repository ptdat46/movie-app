const express = require("express");
const router = express.Router();
const axios = require('axios');
const connection = require('../connect');
const { loadSource, updateSource, loadComments, updateComment} = require('../controllers/watch')

router.post('/:id', loadSource)
router.post('/:id/update', updateSource)
router.get('/:id/comments', loadComments)
router.post('/:id/comments', updateComment)

module.exports = router;
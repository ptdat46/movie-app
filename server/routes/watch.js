const express = require("express");
const router = express.Router();
const axios = require('axios');
const connection = require('../connect');
const { loadSource, updateSource, loadComments, updateComment,
    deleteComment
} = require('../controllers/watch')

router.post('/:id', loadSource)
router.post('/:id/update', updateSource)
router.get('/:id/comments', loadComments)
router.post('/:id/comments', updateComment)
router.post('/:id/delete-comment', deleteComment)

module.exports = router;
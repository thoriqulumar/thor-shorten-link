const {
  postShortenUrl,
  redirectUrl,
} = require('../controllers/url.controller');

const express = require('express');
const router = express.Router();

router.post('/', postShortenUrl);
router.get('/:url', redirectUrl);

module.exports = router;

// url.js

const express = require('express');
const router = express.Router();
const { generateShortUrl,handleRedirect } = require('../controller/url');

router.post('/', generateShortUrl);
router.get('/:shortId',handleRedirect);
module.exports = router;

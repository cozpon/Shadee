const express = require('express');
const router = express.Router();

const db = require('../models');
const Emoji = db.emoji;

router.get('/', (req, res) => {
  return Emoji.findAll()
  .then(emojis => {
    return res.json(emojis);
  });
});

module.exports = router;
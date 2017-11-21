const express = require('express');
const router = express.Router();

const db = require('../models');
const Status = db.status;

router.get('/', (req, res) => {
  return Status.findAll()
  .then(statuses => {
    return res.json(statuses);
  });
});

module.exports = router;
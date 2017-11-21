const express = require('express');
const router = express.Router();

const db = require('../models');
const Role = db.role;

router.get('/', (req, res) => {
  return Role.findAll()
  .then(roles => {
    return res.json(roles);
  });
});

module.exports = router;
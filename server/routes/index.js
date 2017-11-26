const express = require('express');

const users = require('./users');
const messages = require('./messages');
const statuses = require('./statuses');
const roles = require('./roles');
const emojis = require('./emojis');
const auth = require('./auth');
const rumors = require('./rumors');

const router = express.Router();

router.use('/users', users);
router.use('/messages', messages);
router.use('/statuses', statuses);
router.use('/roles', roles);
router.use('/emojis', emojis);
router.use('/auth', auth);
router.use('/rumors', rumors);

module.exports = router;
const express = require('express');
const router = express.Router();

const db = require('../models');
const Message = db.message;
const User = db.user;
const Status = db.status;

router.get('/', (req, res) => {
  return Message.findAll({
    include:[
      { model: User, as: 'shader' },
      { model: User, as: 'victim' },
      { model: Status, as: 'message_status' }
    ]
  })
  .then(messages => {
    return res.json(messages);
  })
  .catch((err) => {
    console.log(err);
  })
});

router.post('/', (req, res) => {
  //note: no idea how media will work lol. there will be some uploading stuff going on. just a placeholder.
  Message.create({
    body: req.body.body,
    media: req.body.media,
    shader_id: req.user.id,
    victim_id: req.body.victim
  })
  .then((message) => {
    return res.json(message);
  })
  .catch((err) => {
    console.log(err);
  });
});

router.get('/:id', (req, res) => {
  let id = req.params.id;
  return Message.findById(id, {
    include:[
      { model: User, as: 'shader' },
      { model: User, as: 'victim' },
      { model: Status, as: 'message_status'}
    ]
  })
  .then((message) => {
    return res.json(message);
  })
  .catch((err) => {
    console.log(err);
  });
});

router.put('/:id', (req, res) => {
  let newInfo = req.body;
  let id = req.params.id;
  //note: newInfo coming in from axios should be an object whose keys match the columns in messages
  return Message.findById(id)
  .then((message) => {
    if(parseInt(message.shader_id) === parseInt(req.user.id)){
      return message.update(newInfo, {
        returning: true,
        plain: true
      })
      .then((message) => {
        return Message.findById(id, {
          include: [
            { model: User, as: 'shader'},
            { model: User, as: 'victim' },
            { model: Status, as: 'message_status'}
          ]
        })
        .then((foundMessage) => {
          return res.json(foundMessage);
        })
      })
      .catch((err) => {
        console.log(err);
      })
    }
  })
});

router.delete('/:id', (req, res) => {
  let id = req.params.id;

  return Message.findById(id)
  .then(message => {
    return message.update({deletedAt : Date.now()}, {
      returning: true,
      plain: true
    })
    .then(message => {
      return res.json(message);
    })
  })
  .catch((err) => {
    console.log(err);
  });
});

module.exports = router;
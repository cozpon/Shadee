const express = require('express');
const router = express.Router();

const db = require('../models');
const Rumor = db.rumor;
const User = db.user;

router.get('/', (req, res) => {
  return Rumor.findAll({
    include: [
      { model: User, as: 'user',
        attributes: ['username', 'id']
      }
    ]
  })
  .then(rumors => {
    return res.json(rumors);
  });
});

router.post('/', (req, res) => {
  //note: data must be an object.
  console.log(req.body);
  let data = {
    user_id: req.body.user_id,
    body: req.body.body
  }
  return Rumor.create(data)
  .then((rumor) => {
    return Rumor.findById(rumor.id, {
      include:[
        { model: User, as: 'user',
          attributes: ['username', 'id']
        }
      ]
    })
    .then((foundRumor) => {
      return res.json(foundRumor);
    })
    .catch((err) => {
      console.log(err);
    })
  })
})

module.exports = router;
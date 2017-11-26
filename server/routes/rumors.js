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
  let data = req.body;
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

router.put('/:id', (req, res) => {

  let points = req.body.points;
  let id = req.params.id;

  return Rumor.findById(id)
  .then((rumor) => {
    if(parseInt(points, 10)===0){
      return rumor.update({
        points: parseInt(rumor.points,10)-1
      })
    }else if(parseInt(points, 10)===1){
      return rumor.update({
        points: parseInt(rumor.points,10)+1
      })
    }
  })
  .then(() => {
    return Rumor.findById(id, {
      inclue: [
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
});

module.exports = router;
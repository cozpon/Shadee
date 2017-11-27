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
      console.log(foundRumor);
      return res.json(foundRumor);
    })
    .catch((err) => {
      console.log(err);
    })
  })
})

router.put('/:id', (req, res) => {

  let points = req.body.points;
  let id = req.body.id;
  if(points===0){
    return Rumor.findById(id)
    .then((rumor) => {
      return rumor.update({
        points: parseInt(rumor.points,10)-1
      }, {
        returning: true,
        plain: true
      })
      .then((downVotedRumor) => {
        return Rumor.findById(id, {
          include: [
            { model: User, as: 'user',
              attributes: ['username', 'id']
            }
          ]
        })
        .then((foundRumor) => {
          return res.json(foundRumor);
        })
      })
    });
  }else{
    return Rumor.findById(id)
    .then((rumor) => {
      return rumor.update({
        points: parseInt(rumor.points,10)+1
      }, {
        returning: true,
        plain: true
      })
      .then((upVotedRumor) => {
        return Rumor.findById(id, {
          include: [
            { model: User, as: 'user',
              attributes: ['username', 'id']
            }
          ]
        })
        .then((newRumor) => {
          return res.json(newRumor);
        })
      })
    });
  }
});

module.exports = router;
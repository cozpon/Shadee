const express = require('express');
const router = express.Router();

const bcrypt = require('bcrypt');
const saltRounds = 12;

const db = require('../models');
const User = db.user;
const Message = db.message;
const Status = db.status;
const Emoji = db.emoji;


//api/users gets you JUST the users

router.get('/', (req, res) => {
  return User.findAll()
  .then(users => {
    return res.json(users);
  })
  .catch((err) => {
    console.log(err);
  })
});

//api/users/all gets you all users + their related tables

router.get('/all', (req, res) => {
  return User.findAll({
    attributes: {
      exclude: ['password']
    },
    include: [
      { model: Message, as: 'offense' },
      { model: Message, as: 'defense' },
      { model: Status, as: 'user_status' },
      { model: Emoji, as: 'icon' }
    ]
  })
  .then((users) => {
    return res.json(users);
  })
  .catch((err) => {
    console.log(err);
  });
});

router.get('/:id', (req, res) => {
  let id = req.params.id;
  return User.findById(id, {
    attributes: {
      exclude: ['password']
    },
    include:[
      { model: Message, as: 'offense' },
      { model: Message, as: 'defense' },
      { model: Status, as: 'user_status' },
      { model: Emoji, as: 'icon' }
    ]
  })
  .then((user) => {
    return res.json(user);
  })
  .catch((err) => {
    console.log(err);
  });
});



// //register
// router.post('/register', (req, res) => {
//   //note: req.body will need an emoji field w/ emoji id.
//   console.log(req.body);
//   bcrypt.genSalt(saltRounds, (err, salt) => {
//     bcrypt.hash(req.body.password, salt, (err, hash) => {
//       User.create({
//         username: req.body.username,
//         password: hash,
//         emoji_id: req.body.emoji
//       })
//       .then((user) => {
//         return res.json(user);
//       })
//       .catch((err) => {
//         console.log(err);
//       });
//     });
//   });
// });

// router.put('/:id', (req, res) => {
//   bcrypt.genSalt(saltRounds, (err, salt) => {
//     bcrypt.hash(req.body.password, salt, (err, hash) => {
//       return User.findOne({
//         where: {
//           id: req.user.id
//         }
//       })
//       .then((user) => {
//         return User.update({
//           username: req.body.username || user.username,
//           password: hash || user.password,
//           email: req.body.email || user.email
//         })
//         .then((response) => {
//           return User.findOne({
//             where: {
//               id: req.user.id
//             }
//           })
//           .then((updatedUser) => {
//             return res.json(updatedUser);
//           });
//         });
//       });
//     });
//   });
// });

// router.post('/auth', (req, res) => {
//   return res.json('Authenticate and retrieve the access and refresh tokens in exchange of email/password');
// });

// router.post('/auth/refresh', (req, res) => {
//   return res.json('Authenticate and retriece the access token in exchange of the refresh token.');
// });

// router.post('/auth/revoke', (req, res) => {
//   return res.json('Log out, revoke access by destroying the user tokens');
// });

module.exports = router;
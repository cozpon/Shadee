const express = require('express');
const bodyParser = require('body-parser');
const passport = require('passport');
const bcrypt = require('bcrypt');
const LocalStrategy = require('passport-local').Strategy;
const app = express();
const saltRounds = 12;
const router = express.Router();

const db = require('../models');
const User = db.user;
const Status = db.status;
const Emoji = db.emoji;

router.post('/login',
  passport.authenticate('local'), (req, res) => {
  console.log(req.user, 'req.user')
  return res.json({
    id: req.user.id,
    username: req.user.username,
    success: true
  });
});

router.get('/logout', (req, res) => {
  req.logout();
  console.log('user logged out');
  res.sendStatus(200);
});

router.post('/register', (req, res) => {
  console.log(req.body);
  const { email, username } = req.body;
  console.log(req.body, 'Req body');
  return User.findOne({
    where: { $or : [{ username: username }, { email: username }] }, // lets client login with username or email
    attributes: { exclude: ['password'] }
  })
  .then(response => {
    // if user does not exist, findOne will return null
    // if user does exist, user details will be returned
    if(response){
      res.json({
        error: 'sorry, that username/email is already in use!'
      });

    } else {
        bcrypt.genSalt(saltRounds, function(err, salt){
          bcrypt.hash(req.body.password, salt, function(err, hash){
            console.log(hash);
            User.create({
              username: username,
              password: hash,
              email: email,
              emoji_id: 1
            })
            .then((user) => {
              console.log(user, 'user reg data')
              return res.json({
                username: user.username,
                password: user.password,
                email: user.email,
                emoji_id: user.emoji_id,
                success: true
              });
            });
          });
        });
      }
    })
  .catch((err) => {
    console.log("error", err);
    return res.json({
      error : 'Oh no! Something went wrong!'
    });
  });
});

module.exports = router;


//edit username and password

// app.put('/users/:id/edit', (req,res) => {
//   console.log(req.body, 'edit username route');
//   bcrypt.genSalt(saltRounds, function(err, salt){
//     bcrypt.hash(req.body.password, salt, function(err, hash){
//       console.log(hash);
//       return db.User.findOne({
//         where: {
//           id: req.user.id
//           }
//         })
//         .then(user => {
//           return db.User.update({
//             username: req.body.username || user.username,
//             password: hash || user.password,
//             email: req.body.email || user.email
//           },
//           {where: {
//             id: req.user.id
//             }
//           })
//           .then(response => {
//             return db.User.findOne({
//               where : {
//                 id: req.user.id
//               }
//             })
//             .then(updatedUser => {
//             return res.json(updatedUser);
//           });
//         });
//       });
//     });
//   });
// });

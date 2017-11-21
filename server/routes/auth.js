const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');
const passport = require('passport');
const bcrypt = require('bcrypt');
const LocalStrategy = require('passport-local').Strategy;
const app = express();
const saltRounds = 12;

const db = require('../models');
const User = db.user;
const Status = db.status;
const Emoji = db.emoji;


passport.serializeUser((user, done) => {
  //console.log('USER', user);
  console.log('serializing');
  return done(null, {
    id: user.id,
    username: user.username
  });
});

passport.deserializeUser((user, done) => {
  console.log(user, 'DESERIAL USER');
  console.log('deserializing');
  db.User.findOne({where: { id: user.id }})
  .then((user) => {
    return done(null, {
      id: user.id,
      username: user.username
    });
  });
});

passport.use(new LocalStrategy(function (username, password, done) {
  console.log('passport use ==>', username, password);
  db.User.findOne({where: {username: username}})
    .then((user) => {
      if(user === null){
        return done(null, false, {message: 'bad username or password'});
      }else{
        bcrypt.compare(password, user.password)
        .then((res) => {
          if(res){
            var foundUser = user.get();
            delete foundUser.password;
            return done(null, foundUser);
          }else{
            return done(null, false, {message: 'bad username or password'});
          }
        });
      }
    })
    .catch((error) => {
      console.log('ERROR:', error);
    });
}));


router.post('/login', passport.authenticate('local'), function(req, res){
  const user = req.user;
  res.json(req.user);
});

router.get('/logout', (req, res) => {
  req.logout();
  console.log('user logged out');
  res.sendStatus(200);
});

router.post('/register', (req, res) => {
  console.log('register route')
  console.log(req.body, 'Req body');
  bcrypt.genSalt(saltRounds, function(err, salt){
    bcrypt.hash(req.body.password, salt, function(err, hash){
      console.log(hash);
      User.create({
        username: req.body.username,
        password: hash,
        email: req.body.email,
        emoji_id: 1
      })
      .then((user) => {
        console.log(user, 'user reg data')
        res.json({
        username: user.username,
        password: user.password,
        email: user.email,
        emoji_id: user.emoji_id
        });
      })
      .catch((error) => {
        console.log(error)
        return res.send('Stupid username');
      });
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

const express = require('express');
const router = express.Router();

const db = require('../models');
const Message = db.message;
const User = db.user;
const Status = db.status;

const multer = require('multer');
const aws = require('aws-sdk');
const multerS3 = require('multer-s3');

const skd = require('../_lib/keyconfig.js');

aws.config.update({
  secretAccessKey: skd.sak,
  accessKeyId: skd.aki,
  region: skd.region
});

const s3 = new aws.S3();

const upload = multer({
  storage: multerS3({
    s3: s3,
    bucket: 'shade.storage',
    contentType: multerS3.AUTO_CONTENT_TYPE,
    contentDisposition: 'inline',
    key: function(req, file, cb){
      console.log(file);
      cb(null, Date.now() + "-" + file.originalname);
    }
  })
});

router.get('/', (req, res) => {
  console.log(req);
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


//note: key in upload form for media must be upl. like when i'm using postman the file's key has to be 'upl'
//also note: shader_id will be req.user.id once we can actually log in. otherwise, we can always provide the shader_id in the request body, amiright guys?

router.post('/', upload.array('upl', 1), (req, res) => {

  if(req.files[0]){
    Message.create({
      body: req.body.body,
      shader_id: req.body.shader_id,
      victim_id: req.body.victim_id,
      media: req.files[0].key
    })
    .then((message) => {
      return res.json(message);
    })
    .catch((err) => {
      console.log(err);
    });
  }else{
     Message.create({
      body: req.body.body,
      shader_id: req.body.shader_id,
      victim_id: req.body.victim_id
    })
    .then((message) => {
      return res.json(message);
    })
    .catch((err) => {
      console.log(err);
    });
  }

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
  //note: gotta add media upload! nah, jk.
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
var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var mongoDBURL = "mongodb://localhost:27017/GSPDB";
var Users = require('../models/Users.js');

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

// For Registration
router.post('/registration', function(req, res, next){
  console.log("res registration ", req.body);
      Users.create(req.body, function(err, post){
        if(err) return next (err)
        res.json(post);
      });
});

// For user Detail Response

router.post('/userDetail',function(req, res, next){
  console.log('req ', req.body);
  let user_id = req.body['id'];
  console.log(user_id);

  Users.findOne({
    $and: [{_id: user_id}]
    }).then((user)=>{
      console.log("user ", user);
        if(user==null) return res.status(404).json({
            status: false,
            message: 'No user found'
        })
        return res.json({
          status: true,
            user: user
        })
    }).catch((err)=>{
        return res.status(500).json({
          status: false,
            message: 'Encountered an error finding user',
            error: err
        })
    })

})

// For Login
router.post('/login', function(req, res, next){
  console.log("response login ", req.body);
  
  Users.findOne({
    $and: [
        {email: req.body.email}, 
        {password: req.body.password}
    ]
    }).then((user)=>{
        if(user==null) return res.status(404).json({
            status: false,
            message: 'No user found'
        })
        return res.json({
          status: true,
            user: user
        })
    }).catch((err)=>{
        return res.status(500).json({
          status: false,
            message: 'Encountered an error finding user',
            error: err
        })
    })

  // Users.find(function(error, callback){
  //   if(error) throw(error)
  //   console.log("callback ",callback);

  //   const result = callback.find( ({ email }) => email === req.email );
  //   console.log("result ", result)

  // })

})

module.exports = router;

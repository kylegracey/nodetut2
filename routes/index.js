var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

/* GET Hello World page. */
router.get('/helloworld', (req, res) => {
  res.render('helloworld', { title: 'Hello, World!' });
});

// User List Page
router.get('/userlist', (req, res) => {
  var db = req.db;
  var collection = db.get("usercollection");
  collection.find({},{},function(err,docs) {
      res.render('userlist', {
        "userlist" : docs
      })
  });
});

// New User Page
router.get('/newuser', function(req, res) {
  res.render('newuser', {title: 'Add New User'})
});

// Post to Add User Service
router.post('/adduser', function (req, res) {

  // Set our internal db variable
  var db = req.db;

  // Get our form values. These rely on the "name" attributes
  var userName = req.body.username;
  var userEmail = req.body.useremail;

  // Set our collection
  var collection = db.get('usercollection');

  // Submit to DB
  collection.insert({
    "username": userName,
    "email": userEmail
  }, function(err, doc){
    if (err) {
      // It failed, return error
      res.send("There was a problem adding the information to the database");
    }
    else {
      // And forward to success page
      res.redirect('userlist');
    }
  });

});

module.exports = router;

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

module.exports = router;

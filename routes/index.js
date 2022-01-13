const { text } = require('express');
var express = require('express');
const res = require('express/lib/response');
var router = express.Router();

const messages = [
  {
    text: "Hi there!",
    user: "Amando",
    added: new Date()
  },
  {
    text: "Hello World!",
    user: "Charles",
    added: new Date()
  }
];



/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Mini Message', messages: messages });
});

router.get('/new', function(req, res){
  res.render('form', { title: 'New Message' })
})

router.post('/new', function(req, res){
  var messtext = req.body.messText
  var author = req.body.user  
  
  messages.push({text: messtext, user: author, added: new Date() })

  res.redirect('/')
})

module.exports = router;

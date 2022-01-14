const { text } = require('express');
var express = require('express');
const res = require('express/lib/response');
var router = express.Router();
var pool = require('../db.js')
var url = require('url')
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
router.get("/index", async (req, res)=>{
  try{
    const newState = await pool.query("SELECT * FROM public.log")
      res.json(newState.rows)
  
  } catch (err) {
      console.log(err.message)
  }
})

router.post('/new', async function(req, res){
  try { 
    var messtext = req.body.messText
    var author = req.body.user  
    var date = new Date()
    const newMessage = await pool.query("INSERT INTO log (content, author, date) VALUES ($1, $2, $3)", [messtext, author, date])
    messages.push({text: messtext, user: author, added: date })
    console.log(newMessage.rows)
    res.redirect('/')
  }catch (err){
    console.log(err.message)
  }
})

module.exports = router;

var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res) {
  var request = require('request')
  var reddit_base_url = 'https://reddit.com'
  var after = req.query.after
  var request_url = reddit_base_url+'/r/all.json?'+(after ? 'after='+after : '')
  request(request_url, function(err, response, body){
    body = JSON.parse(body)
    res.render('index', { title: 'Vireddita', posts: body.data.children, after: body.data.after });
  })
});

module.exports = router;

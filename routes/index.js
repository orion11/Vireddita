var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res) {
  var request = require('request')
  var reddit_base_url = 'https://reddit.com'
  request(reddit_base_url+'/r/all.json', function(err, response, body){
    body = JSON.parse(body)
    res.render('index', { title: 'Express', posts: body.data.children });
  })
});

module.exports = router;

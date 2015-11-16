var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res) {
  var request = require('request')
  var reddit_base_url = 'https://reddit.com'
  var before = req.query.before
  var after = req.query.after
  var direction = {count: req.query.count}
  if(before){
    direction.name = 'before'
    direction.id = before
  }
  if(after) {
    direction.name = 'after'
    direction.id = after
  }
  // var direction = { before: req.query.before, after: req.query.after, count: calculateNewCount(req) }
  var request_url = reddit_base_url+'/r/all.json?'+
    (direction.name ? direction.name+'='+direction.id : '')+
    (direction.count ? '&count='+direction.count : '')
    console.log(request_url)
  request(request_url, function(err, response, body){
    body = JSON.parse(body)
    console.log(body.data.after, body.data.before)
    res.render('index', {
      title: 'Vireddita',
      posts: body.data.children,
      pagination: {
        after: body.data.after,
        before: body.data.before,
        count: calculateNewCount(req, direction)
      }
    });
  })
});

module.exports = router;

function calculateNewCount(req, direction) {
  var count = { old: +direction.count || 25, new: {}}
  // var last_direction = !!req.headers.referer && req.headers.referer.match(/(after|before)=t\d_[a-zA-Z\d]*/)
  if(direction.name == 'before') {
    count.new.before = count.old - 25
    count.new.after = count.old - 1
  }
  else if(direction.name == 'after') {
    count.new.before = count.old + 1
    count.new.after = count.old + 25
  }
  else count.new.after = count.old
  console.log(count)
  return count
}
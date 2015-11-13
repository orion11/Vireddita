$(".favorite").click(function(e){
  var $this = $(this)
  var post = $this.parent(".post")
  if( $(this).attr("selected") ) {
    Favorites.remove(post)
    $this.attr("favorite", false).children("i").removeClass("fa-star").addClass("fa-star-o")
  }
  else {
    Favorites.add(post)
    $this.attr("favorite",true).children("i").removeClass("fa-star-o").addClass("fa-star")
  }
})

var Favorites = (function(){
  var favorites = localStorage.favorites || {data:[], ledger:{}}
  if(typeof favorites == 'string' ) favorites = JSON.parse(favorites)

  function save() {
    localStorage.favorites = JSON.stringify(favorites)
  }

  return {
    add: function(post) {
      var data = {
        id : post.attr("id"),
        title : post.children(".title").text(),
        url: post.children(".title").attr("href"),
        thumbnail: (!!post.children(".thumbnail").length ? post.children(".thumbnail") : '')
      }
      favorites.data.push(data)
      favorites.ledger[data.id] = true
      save()
    },
    remove: function(post) {
      var id = post.attr("id")
      var index
      favorites.data.some(function(fav, i){ if(fav.id == id){ index = i; return true } })
      favorites.data.splice(index, 1)
      delete favorites.ledger[id]
      save()
    }
  }
}())
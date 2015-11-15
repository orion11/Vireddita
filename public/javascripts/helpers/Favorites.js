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
        url: post.children(".post-overlay").attr("href"),
        thumbnail: (!!post.children(".thumbnail").length ? post.children(".thumbnail").attr("src") : '')
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
    },
    get: function(){ return favorites },
    isFavorite: function(id) { return !!favorites.ledger[id] },
    sortByID: function(id_list) {
      favorites.data  = id_list.map(function(id){
        return favorites.data.find(function(f){ return f.id == id })
      })
      save()
    }
  }
}())
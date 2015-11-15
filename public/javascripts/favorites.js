renderFavorites()

$(".favorite").click(function(e){
  var $this = $(this)
  var post = $this.parent(".post")
  if( $(this).attr("favorite") == "true") {
    Favorites.remove(post)
    post.remove()
  }
})

$("ul.favorites")
.sortable({opacity:.5, appendTo: document.body})
.on("sortstop", function(event, ui){
  var id_list = $(this).sortable("toArray")
  Favorites.sortByID(id_list)
})


function renderFavorites() {
  var favorites = Favorites.get()
  var dom = {
    container: $(".favorites"),
    post: $("<li>").addClass("post"),
    thumbnail: $("<img>").addClass("thumbnail"),
    title: $("<span>").addClass("title"),
    icon: $("<span>").addClass("favorite").attr("favorite", true).append($("<i>").addClass("fa fa-star fa-lg")),
    overlay: $("<a>").addClass("post-overlay"),
    clone: function() {
      return {
        post: this.post.clone(),
        thumbnail: this.thumbnail.clone(),
        title: this.title.clone(),
        icon: this.icon.clone(),
        overlay: this.overlay.clone()
      }
    }
  }

  favorites.data.forEach(function(fav){
    var post = dom.clone()
    post.post.attr("id", fav.id)
    post.overlay.attr("href", fav.url)
    post.title.text(fav.title)
    if(fav.thumbnail) {
      post.thumbnail.attr("src", fav.thumbnail)
      post.post.append(post.thumbnail)
    }
    post.post.append(post.title, post.overlay, post.icon)
    dom.container.append(post.post)
  })
}

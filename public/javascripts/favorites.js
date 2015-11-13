function renderFavorites() {
  var favorites = Favorites.get()
  var dom = {
    container: $(".favorites"),
    post: $("<li>").addClass("post"),
    thumbnail: $("<img>").addClass("thumbnail"),
    title: $("<a>").addClass("title"),
    icon: $("<span>").addClass("favorite").append($("<i>").addClass("fa fa-star")),
    clone: function() {
      return {
        post: this.post.clone(),
        thumbnail: this.thumbnail.clone(),
        title: this.title.clone(),
        icon: this.icon.clone()
      }
    }
  }

  favorites.data.forEach(function(fav){
    var post = dom.clone()
    post.post.attr("id", fav.id)
    post.title.attr("href", fav.url).text(fav.title)
    if(fav.thumbnail) {
      post.thumbnail.attr("src", fav.thumbnail)
      post.post.append(post.thumbnail)
    }
    post.post.append(post.title, post.icon)
    dom.container.append(post.post)
  })
}

renderFavorites()
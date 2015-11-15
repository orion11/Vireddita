$(".favorite").click(function(e){
  var $this = $(this)
  var post = $this.parent(".post")
  if( $(this).attr("favorite") == "true" ) {
    Favorites.remove(post)
    $this.attr("favorite", false).children("i").removeClass("fa-star").addClass("fa-star-o")
  }
  else {
    Favorites.add(post)
    $this.attr("favorite",true).children("i").removeClass("fa-star-o").addClass("fa-star")
  }
})

// Mark any existing favorites
$(".post").each(function(i, post){
  var id = $(post).attr("id")
  if( Favorites.isFavorite(id) ) {
    $(this).children(".favorite").attr("favorite", true).children("i").removeClass("fa-star-o").addClass("fa-star")
  }
})
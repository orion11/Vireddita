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

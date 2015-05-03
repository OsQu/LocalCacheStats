var URL = "http://188.166.59.119/event/aggregate"


$(function() {
  $.get(URL).then(function(response) {
    var renderer = new Renderer("hs", response["HS"]);
    renderer.render();

    renderer = new Renderer("cache", response["CACHE"]);
    renderer.render();

    console.log(response);
  });
})

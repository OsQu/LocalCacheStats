var DATA_URL = "http://188.166.59.119/event/aggregate"
var EVENTS_URL = "http://188.166.59.119/event"


$(function() {
  google.load('visualization', '1.1', {packages: ['scatter']});
  google.setOnLoadCallback(renderGoogleCharts);
  $.get(DATA_URL).then(function(response) {
    var renderer = new Renderer("hs", response["HS"]);
    renderer.render();

    renderer = new Renderer("cache", response["CACHE"]);
    renderer.render();

    console.log(response);
  });

  function renderGoogleCharts() {
    $.get(EVENTS_URL).then(function(response) {
      var chart = new TimeSizeChart("hs-time-filesize", eventsFor("HS", response))
      chart.render();

      chart = new TimeSizeChart("cache-time-filesize", eventsFor("CACHE", response));
      chart.render();
    });
  }
})

function eventsFor(host, response) {
  return _.filter(response, function(e) { return e["host"] == host });
}

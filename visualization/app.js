var DATA_URL = "http://188.166.59.119/event/aggregate"
var EVENTS_URL = "http://188.166.59.119/event"


$(function() {
  google.load('visualization', '1.1', {packages: ['scatter']});
  google.setOnLoadCallback(renderEventCharts);
  $.get(DATA_URL).then(function(response) {
    var renderer = new Renderer("hs", response["HS"]);
    renderer.render();

    renderer = new Renderer("cache", response["CACHE"]);
    renderer.render();
  });

  function renderEventCharts() {
    $.get(EVENTS_URL).then(function(response) {
      hsEvents = eventsFor("HS", response);
      var chart = new TimeSizeChart("hs-time-filesize",  hsEvents)
      chart.render();

      var table = new EventsTable("#hs-files", hsEvents);
      table.render();

      cacheEvents = eventsFor("CACHE", response);
      chart = new TimeSizeChart("cache-time-filesize", cacheEvents);
      chart.render();

      table = new EventsTable("#cache-files", cacheEvents);
      table.render();
    });
  }
})

function eventsFor(host, response) {
  return _.filter(response, function(e) { return e["host"] == host });
}

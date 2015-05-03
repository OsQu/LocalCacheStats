function EventsTable(selector, events) {
  this.selector = selector;
  this.events = events;
}

EventsTable.prototype.render = function() {
  $tbody = $(this.selector).find("tbody");
  console.log(this.events[0])
  _.each(this.events, function(e) {
    $el = $("<tr>")
      .append($("<td>").text("…" + e["file"].substring(e["file"].length - 30)))
      .append($("<td>").text(parseInt(e["duration"])))
      .append($("<td>").text(parseInt(e["size"])))
      .append($("<td>").text(e["device_name"]));
    $tbody.append($el);
  });
}

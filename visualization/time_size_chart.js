function TimeSizeChart(selector, events) {
  this.selector = selector;
  this.events = events;
}

TimeSizeChart.prototype.render = function() {
  var data = new google.visualization.DataTable();
  data.addColumn("number", "File Size");
  data.addColumn("number", "Time");

  data.addRows(this.data());

  var options = {
    width: 500,
    height: 500,
    chart: {
      title: "Download times",
      subtitle: "versus file size"
    },
    hAxis: { title: "File size in bytes" },
    vAxis: { title: "Time in ms" }
  }

  console.log(document.getElementById(this.selector));
  var chart = new google.charts.Scatter(document.getElementById(this.selector));
  chart.draw(data, google.charts.Scatter.convertOptions(options));
}

TimeSizeChart.prototype.data = function() {
  var a = _.map(this.events, function(e) {
    return [parseInt(e["size"]), parseInt(e["duration"])]
  });

  return a;
}

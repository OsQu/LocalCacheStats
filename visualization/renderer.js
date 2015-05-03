function Renderer(prefix, data) {
  this.prefix = prefix;
  this.data = data;
}

Renderer.prototype.render = function() {
  this.renderAvgFiles();
  this.renderDownloadTime();
  this.renderAvgDownloadSpeed();
  this.renderTimeAndFileSize();
  this.renderFiles();
}

Renderer.prototype.renderAvgFiles = function() {
  var $el = this._findElement("avg-files");
  var value = Math.round(this.data["average_file_count"]);
  $el.text(value);
}

Renderer.prototype.renderDownloadTime = function() {
  var $el = this._findElement("dl-time");
  var value = Math.round(this.data["average_duration"]);
  $el.text(value + " ms");
}

Renderer.prototype.renderAvgDownloadSpeed = function() {
  var $el = this._findElement("dl-speed");
  var averageSizeInKb = this.data["average_file_size"];
  var averageTime = this.data["average_duration"];
  var value = (averageSizeInKb / averageTime).toFixed(2);

  $el.text(value + " kb/ms");
}

Renderer.prototype.renderTimeAndFileSize = function() {}
Renderer.prototype.renderFiles = function() {}

/* Helpers */
Renderer.prototype._findElement = function(id) {
  return $("#" + this.prefix + "-" + id);
}

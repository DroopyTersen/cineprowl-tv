var moment = require("moment");

var ClockViewModel = function() {
    this.now = {
        day: "",
        date: "",
        time: ""
    };
};

ClockViewModel.prototype.init = function() {
    this.update();
    setInterval(this.update.bind(this), 20000);
};

ClockViewModel.prototype.update = function() {
    var _now = moment();
    this.now = {
        day: _now.format("dddd"),
        date: _now.format("MMM Do"),
        time: _now.format("h:mm a")
    };
};

module.exports = ClockViewModel;
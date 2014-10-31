var ko = require("knockout");
var moment = require("moment");

var clockViewModel = function() {
    var now = ko.observable({
        day: "",
        date: "",
        time: ""
    });
    
    var dayDate = ko.computed(function(){
        return now().day + ", " + now().date;
    }, this);
    
    var update = function() {
        var _now = moment();
        now({
            day: _now.format("dddd"),
            date: _now.format("MMM Do"),
            time: _now.format("h:mm a")
        });
    };
    var init = function() {
        update();
        setInterval(update, 20000);
    };
    
    return {
        init: init,
        now: now,
        dayDate: dayDate
    };
};

module.exports = clockViewModel();
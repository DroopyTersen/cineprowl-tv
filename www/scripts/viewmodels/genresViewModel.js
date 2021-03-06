var dataservice = require("../services/dataservice");
var GridViewModel = require("./gridViewModel");
var config = require("../config");

var GenresViewModel = function() {
    var self = this;
    GridViewModel.call(this);
    self.collection = "genres";
    self.observables.globalNav = config.globalNav;
    this.init();
};

module.exports = GenresViewModel;
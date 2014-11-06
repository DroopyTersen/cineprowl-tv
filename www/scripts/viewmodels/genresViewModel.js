var dataservice = require("../services/dataservice");
var GridViewModel = require("./gridViewModel");
var ko = require("knockout");
var GenresViewModel = function() {
    var self = this;
    GridViewModel.call(this);
    self.collection = "genres";
    this.init();
};

module.exports = GenresViewModel;
var ko = require("knockout");
var HomeViewModel = require("../viewmodels/homeViewModel");

var homeView = function() {
    var viewModel = null;
    var init = function() {
        viewModel = new HomeViewModel();
        ko.applyBindings(viewModel)
    };
    return {
        vm: function() { return viewModel },
        init: init
    };
};

module.exports = homeView();
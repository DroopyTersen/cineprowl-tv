var ko = require("knockout");
var HomeViewModel = require("../viewmodels/homeViewModel");

var homeView = function() {
    var viewModel = new HomeViewModel();
    var init = function() {
        ko.applyBindings(viewModel)
    };
    return {
        vm: viewModel,
        init: init
    };
};

module.exports = homeView();
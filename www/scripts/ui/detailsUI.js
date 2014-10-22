var ko = require("knockout");
var DetailsViewModel = require("../viewmodels/detailsViewModel");

var detailsView = function() {
    var viewModel = null;
    var init = function() {
        viewModel = new DetailsViewModel();
        ko.applyBindings(viewModel)
    };
    return {
        vm: function() { return viewModel },
        init: init
    };
};

module.exports = detailsView();
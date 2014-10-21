var ko = require("knockout");
var MoviesViewModel = require("../viewmodels/moviesViewModel");

var moviesView = function() {
    var viewModel = null;
    var init = function() {
        viewModel = new MoviesViewModel();
        console.log(viewModel);
        ko.applyBindings(viewModel)
    };
    return {
        vm: function() { return viewModel },
        init: init
    };
};

module.exports = moviesView();
var app = {};
var HomeViewModel = require("./viewmodels/homeViewModel");
var MoviesViewModel = require("./viewmodels/moviesViewModel");
var DetailsViewModel = require("./viewmodels/detailsViewModel");
var ko = require("knockout");

var baseView = function(ViewModel) {
    var viewModel = null;
    var init = function() {
        viewModel = new ViewModel();
        ko.applyBindings(viewModel)
    };
    return {
        vm: function() { return viewModel },
        init: init
    };
};

app.views = {};
app.views.home = baseView(HomeViewModel);
app.views.movies = baseView(MoviesViewModel);
app.views.details = baseView(DetailsViewModel);

window.app = app;
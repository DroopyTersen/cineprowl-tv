var app = {};
var Binding = require("droopy-binding").DroopyBinding;
var HomeViewModel = require("./viewmodels/homeViewModel");
var MoviesViewModel = require("./viewmodels/moviesViewModel");
var DetailsViewModel = require("./viewmodels/detailsViewModel");
var GenresViewModel = require("./viewmodels/genresViewModel");

var baseView = function(ViewModel) {
    var viewModel = null;
    var init = function() {
        viewModel = new ViewModel();
        viewModel.binding = new Binding('body',viewModel.observables);
    };
    return {
        vm: function() { return viewModel; },
        init: init
    };
};

app.views = {};
app.views.home = baseView(HomeViewModel);
app.views.movies = baseView(MoviesViewModel);
app.views.details = baseView(DetailsViewModel);
app.views.genres = baseView(GenresViewModel);

window.app = app;
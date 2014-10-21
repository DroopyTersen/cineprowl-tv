var templater = require("../services/templater");
var globalNavViewModel = require("./globalNavViewModel");
var HomeNavigator = require("../navigators/homeNavigator");
var dataservice = require("../services/dataservice");

var ko = require("knockout");

var HomeViewModel = function() {
    var self = this;
    self.navigator = null;
    self.activeItem = null;
    self.randomMovie = ko.observable({ backdrop: "/www/images/logo-large2.png"});
    self.clock = require("./clockViewModel");
    self.searchText = ko.observable("");
    
    self.init = function() {
        globalNavViewModel.init();
        self.clock.init();
        self.navigator = new HomeNavigator();
        self.navigator.getActiveItem();
        self.updateRandomMovie();
        setInterval(self.updateRandomMovie, 10000);
    };
    
    self.search = function() {
        alert(self.searchText());
    };
    
    self.updateRandomMovie = function() {
        dataservice.movies.getRandom().then(function(movie) {
            self.randomMovie(movie);
            console.log(self.randomMovie());
        }) 
    };
    
    self.init();
};

module.exports = HomeViewModel;

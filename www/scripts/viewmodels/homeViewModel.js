var templater = require("../services/templater");
var globalNavViewModel = require("./globalNavViewModel");
var HomeNavigator = require("../navigators/homeNavigator");
var dataservice = require("../services/dataservice");

var ko = require("knockout");

var HomeViewModel = function() {
    var self = this;
    self.navigator = null;
    self.activeItem = null;
    self.randomMovie = ko.observable({ backdrop: "/images/logo-large2.png"});
    self.clock = require("./clockViewModel");
    self.searchText = ko.observable("");
    
    self.init = function() {
        globalNavViewModel.init();
        self.clock.init();
        self.navigator = new HomeNavigator();
        self.navigator.getActiveItem();
        self.updateRandomMovie().then(function(){
            $("body").fadeIn();
            $("#searchInput").focus();
        });
        setInterval(self.updateRandomMovie, 20000);
        $(document).on("search-movies", self.search);
    };
    
    self.search = function() {
        window.location.href = "/movies.html?search=" + self.searchText();
    };
    
    self.updateRandomMovie = function() {
        return dataservice.movies.getRandom().then(function(movie) {
            self.randomMovie(movie);
        }) 
    };
    
    self.init();
};

module.exports = HomeViewModel;

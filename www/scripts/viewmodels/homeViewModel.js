var dataservice = require("../services/dataservice");
var ClockViewModel = require("./clockViewModel");
var HomeNavigator = require("../navigators/homeNavigator");
var config = require("../config");

var HomeViewModel = function() {
    var self = this;
	self.observables = {
		clock: new ClockViewModel(),
		randomMovie: {
			title: ""
		},
        globalNav: config.globalNav,
		searchText: ""
	};
   
    self.init = function() {
        self.observables.clock.init();
        self.updateRandomMovie().then(function(){
            $("body").fadeIn();
            $("#searchInput").focus();
        });
        self.navigator = new HomeNavigator();
        self.navigator.getActiveItem();
        setInterval(self.updateRandomMovie, 10000);
        $("form").on("submit", self.search);
    };
    
    self.search = function() {
        window.location.href = "/movies.html?search=" + self.observables.searchText;
        return false;
    };
    
    self.updateRandomMovie = function() {
        return dataservice.movies.getRandom().then(function(movie) {
            self.observables.randomMovie = movie;
        });
    };
    self.init();
};

module.exports = HomeViewModel;

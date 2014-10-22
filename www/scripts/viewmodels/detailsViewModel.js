var queryString = require("../services/queryString");
var dataservice = require("../services/dataservice");
var globalNavViewModel = require("./globalNavViewModel");
var DetailsNavigator = require("../navigators/detailsNavigator");
var config = require("../config");
var ko = require("knockout");
var $ = require("jquery-browserify");

var DetailsViewModel = function() {
    var self = this;
    this.navigator = new DetailsNavigator();
    
    this.movie = ko.observable({ backdrop: "", title: "", id: ""});
    var init = function() {
        globalNavViewModel.init();
        var id = queryString.getValue("id");
        dataservice.movies.byId(id).then(function(movie){
            self.movie(movie);
            $("body").fadeIn(function(){
                self.navigator.getActiveItem();
            });
        });
        
        $(document).on("play-movie", self.play);
    };
    
    this.play = function() {
        var streamUrl = config.playUrl + self.movie().id;
        $.get(streamUrl);
        //window.open(streamUrl);
    };
    
    init();
};

module.exports = DetailsViewModel;
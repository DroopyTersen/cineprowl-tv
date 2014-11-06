var qs = require("querystring");
var dataservice = require("../services/dataservice");
var globalNavViewModel = require("./globalNavViewModel");
var DetailsNavigator = require("../navigators/detailsNavigator");
var config = require("../config");
var ko = require("knockout");
var $ = require("jquery-browserify");

var DetailsViewModel = function() {
    var self = this;
    this.navigator = new DetailsNavigator();

    this.movie = ko.observable({
        backdrop: "",
        title: "",
        id: ""
    });
    
    var init = function() {
        globalNavViewModel.init();
        var params = qs.parse(window.location.search.substring(1));
        if (params.id) {
            dataservice.movies.byId(params.id).then(function(movie) {
                self.movie(movie);
                $("body").fadeIn(function() {
                    self.navigator.getActiveItem();
                });
            });

            $(document).on("play-movie-raw", self.playRaw);
            $(document).on("play-movie-mobile", self.playMobile);
        } else {
            alert("Hey dummy! Pass in an id.");
        }
    };

    this.playRaw = function() {
        var streamUrl = config.playUrl + self.movie().id;
        $.get(streamUrl);
        //window.open(streamUrl);
    };
    this.playMobile = function() {
        var streamUrl = config.playUrl + self.movie().id + "?size=mobile";
        $.get(streamUrl);
        //window.open(streamUrl);
    };

    init();
};

module.exports = DetailsViewModel;
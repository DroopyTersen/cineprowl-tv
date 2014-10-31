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
                console.log(movie);
                self.movie(movie);
                $("body").fadeIn(function() {
                    self.navigator.getActiveItem();
                });
            });

            $(document).on("play-movie", self.play);
        } else {
            alert("Hey dummy! Pass in an id.");
        }
    };

    this.play = function() {
        var streamUrl = config.playUrl + self.movie().id;
        $.get(streamUrl);
        //window.open(streamUrl);
    };

    init();
};

module.exports = DetailsViewModel;
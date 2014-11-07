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
    
    var omxKeyBindings = function() {
        var base = "/omx/";
        var keyCodes = {
            "32": "pause", //space
            "81": "quit", // 'q'
            "37": "leftseek", //left arrow
            "39": "rightseek", //right arrow
            "38": "upseek", //up arrow
            "40": "leftseek", //down arrow
            "219": "volumedown", //left square bracket
            "221": "volumeup", //right square bracket
        };
        
        $(document).on("keydown", function(e){
            if (keyCodes[e.keyCode + ""]) {
                $.get("/omx/" + keyCodes[e.keyCode + ""]);
            }
        })
    };
    
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
        var omxUrl = "/omx/start/" + encodeURIComponent(config.streamUrl + self.movie().id);
        $.get(omxUrl);
        //window.open(streamUrl);
    };
    this.playMobile = function() {
        var omxUrl = "/omx/start/" + encodeURIComponent(config.streamUrl + self.movie().id) + "?size=mobile";
        $.get(omxUrl);
    };

    init();
};

module.exports = DetailsViewModel;
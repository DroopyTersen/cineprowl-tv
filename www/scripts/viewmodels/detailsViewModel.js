var qs = require("querystring");
var dataservice = require("../services/dataservice");
var DetailsNavigator = require("../navigators/detailsNavigator");
var config = require("../config");
var $ = require("jquery-browserify");

var DetailsViewModel = function() {
    var self = this;
    this.navigator = new DetailsNavigator();

	this.observables = {
		movie: {
			backdrop: "",
			title: "",
			id: ""
		},
		globalNav: config.globalNav
	};
    
    var omxKeyBindings = function() {
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
        
        // $(document).on("keydown", function(e){
        //     if (keyCodes[e.keyCode + ""]) {
        //         $.get("/omx/" + keyCodes[e.keyCode + ""]);
        //     }
        // })
    };
    
    var init = function() {
        var params = qs.parse(window.location.search.substring(1));
        if (params.id) {
            dataservice.movies.byId(params.id).then(function(movie) {
                self.observables.movie = movie;
                $("body").fadeIn(function() {
                    self.navigator.getActiveItem();
                });
            });

            $(document).on("play-movie-vlc", self.playVlc);
            $(document).on("play-movie-trailer", self.playTrailer);
            omxKeyBindings();
        } else {
            alert("Hey dummy! Pass in an id.");
        }
    };

    this.playRaw = function() {
        var omxUrl = "/omx/start/" + encodeURIComponent(config.streamUrl + self.movie().id);
        $.get(omxUrl);
        //window.open(streamUrl);
        //var omxUrl = "/omx/start/" + encodeURIComponent(config.streamUrl + self.movie().id) + "?size=mobile";
        //$.get(omxUrl);
    };
    this.playVlc = function() {
        $.get("/vlc/" + self.observables.movie.id);
    };
    this.playTrailer = function() {
        window.open(self.observables.movie.trailerUrl);
    }
    init();
};

module.exports = DetailsViewModel;
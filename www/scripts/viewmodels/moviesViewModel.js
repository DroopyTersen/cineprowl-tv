var dataservice = require("../services/dataservice");
var globalNavViewModel = require("./globalNavViewModel");
var MoviesNavigator = require("../navigators/moviesNavigator");
var qs = require("querystring");
var ko = require("knockout");

var MoviesViewModel = function() {
    var self = this;
    this.activeItem = ko.observable();
    this.movies = ko.observableArray([]);
    this.navigator = new MoviesNavigator();
    this.context = {
        sort: ko.observable("addedToDb"),
        filter: ko.observable({}),
        search: ko.observable(""),
        page: ko.observable(0)
    };

    this.contextText = ko.computed(function() {
        var items = [];

        if (self.context.filter() && self.context.filter().watched === false) {
            items.push("unwatched");
        }
        if (self.context.search()) {
            items.push("'" + self.context.search() + "'");
        }
        return "Showing " + items.join(", ") + " movies";
    }, this);

    this.showLeftArrow = ko.computed(function() {
        return self.context.page() > 0;
    }, this);

    this.showRightArrow = ko.computed(function() {
        return self.movies().length === 10;
    }, this);

    this.selectedMovie = ko.computed(function() {
        if (self.activeItem()) {
            if ($("#" + self.activeItem().id).hasClass("movie")) {
                return self.activeItem();
            }
        }
        return {
            title: "",
            backdrop: ""
        };
    });

    var processQueryString = function() {
        var params = qs.parse(window.location.search.substring(1));
        if (params.search) {
            self.context.search(params.search);
        }
        if (typeof params.watched !== undefined) {
            self.context.filter({
                watched: (params.watched === "true")
            });
        }
    };

    var loadMovies = function() {
        return dataservice.movies.get(self.context).then(function(movies) {
            self.movies(movies);
            self.navigator.populate(movies, self.showLeftArrow(), self.showRightArrow());
            self.activeItem(self.navigator.getActiveItem());
        });
    };

    var eventHandlers = {
        pageLeft: function() {
            self.context.page(self.context.page() > 0 ? self.context.page() - 1 : 0);
            loadMovies().then(eventHandlers.navigationMove);
        },
        pageRight: function() {
            self.context.page(self.context.page() + 1);
            loadMovies().then(eventHandlers.navigationMove);
        },
        navigationMove: function() {
            $(".background.backdrop").fadeOut(function(){
                $(".background.backdrop").remove();
                self.activeItem(self.navigator.getActiveItem());
                var $img = $("<img style='display:none' class='background backdrop' />")
                    .load(function(){
                        $(".background.backdrop").fadeIn();
                    })
                    .attr('src',  self.selectedMovie().backdrop);  
                $("#backgrounds").append($img);
            });
        }
    };

    var init = function() {
        globalNavViewModel.init();
        processQueryString();
        loadMovies().then(function(){
            $("body").fadeIn(function(){
                eventHandlers.navigationMove();
            });
        });
        $(document).on("page-right", eventHandlers.pageRight);
        $(document).on("page-left", eventHandlers.pageLeft);
        $(document).on("navigation-move", eventHandlers.navigationMove);
    };

    init();
};

module.exports = MoviesViewModel;
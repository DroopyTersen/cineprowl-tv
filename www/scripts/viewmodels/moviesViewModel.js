var queryString = require("../services/queryString");
var dataservice = require("../services/dataservice");
var globalNavViewModel = require("./globalNavViewModel");
var MoviesNavigator = require("../navigators/moviesNavigator");

var ko = require("knockout");

var MoviesViewModel = function() {
    var self = this;
    this.activeItem = ko.observable();
    this.movies = ko.observableArray([]);
    this.navigator = new MoviesNavigator();
    this.context = {
        sort: "addedToDb",
        filter: null,
        search: "",
        page: ko.observable(0)
    };

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
        if (queryString.contains("search")) {
            self.context.search = queryString.getValue("search");
        }
        if (queryString.contains("watched")) {
            self.context.filter = {
                watched: queryString.getValue("watched") === "true" ? true : false 
            };
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
            loadMovies();
        },
        pageRight: function() {
            self.context.page(self.context.page() + 1);
            loadMovies();
        },
        navigationMove: function() {
            self.activeItem(self.navigator.getActiveItem());
        }
    }

    var init = function() {
        globalNavViewModel.init();
        processQueryString();
        loadMovies().then(function(){
            $("body").fadeIn(function(){
                
                self.activeItem(self.navigator.getActiveItem());
            });
        });
        $(document).on("page-right", eventHandlers.pageRight);
        $(document).on("page-left", eventHandlers.pageLeft);
        $(document).on("navigation-move", eventHandlers.navigationMove);
    };

    init();
}

module.exports = MoviesViewModel;
var dataservice = require("../services/dataservice");
var globalNavViewModel = require("./globalNavViewModel");
var GenresNavigator = require("../navigators/gridNavigator");
var config = require("../config");
var ko = require("knockout");
var $ = require("jquery-browserify");

var GenresViewModel = function() {
    var self = this;
    this.activeItem = ko.observable();
    this.navigator = new GenresNavigator();
    this.items = ko.observableArray([]);
    this.context = {
        page: ko.observable(0)
    };

    this.showLeftArrow = ko.computed(function() {
        return self.context.page() > 0;
    }, this);

    this.showRightArrow = ko.computed(function() {
        return self.items().length === 10;
    }, this);

    this.selectedItem = ko.computed(function() {
        if (self.activeItem()) {
            if ($("#" + self.activeItem().id).hasClass("genre")) {
                return self.activeItem();
            }
        }
        return {
            name: ""
        };
    });

    var loadGenres = function() {
        return dataservice.genres.get(self.context.page()).then(function(genres) {
            self.items(genres);
            self.navigator.populate(genres, self.showLeftArrow(), self.showRightArrow());
            self.activeItem(self.navigator.getActiveItem());
        });
    };

    var eventHandlers = {
        pageLeft: function() {
            self.context.page(self.context.page() > 0 ? self.context.page() - 1 : 0);
            loadGenres().then(eventHandlers.navigationMove);
        },
        pageRight: function() {
            self.context.page(self.context.page() + 1);
            loadGenres().then(eventHandlers.navigationMove);
        },
        navigationMove: function() {
            self.activeItem(self.navigator.getActiveItem());
        }
    };

    var init = function() {
        globalNavViewModel.init();
        loadGenres().then(function() {
            $("body").fadeIn(function() {
                eventHandlers.navigationMove();
            });
        });
        $(document).on("page-right", eventHandlers.pageRight);
        $(document).on("page-left", eventHandlers.pageLeft);
        $(document).on("navigation-move", eventHandlers.navigationMove);
    };

    init();
};

module.exports = GenresViewModel;
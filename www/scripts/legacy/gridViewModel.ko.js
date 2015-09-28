var globalNavViewModel = require("./globalNavViewModel");
var GridNavigator = require("../navigators/gridNavigator");
var dataservice = require("../services/dataservice");
var ko = require("knockout");
var $ = require("jquery-browserify");

var GridViewModel = function() {
    var self = this;
    this.activeItem = ko.observable();
    this.navigator = new GridNavigator();
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

    this.emptyItem = {
        name: "",
        id: "",
        title: "",
        backdrop: ""
    };
    
    this.selectedItem = ko.computed(function() {
        if (self.activeItem()) {
            if ($("#" + self.activeItem().id).hasClass("grid-item")) {
                return self.activeItem();
            }
        }
        return self.emptyItem;
    });

    this.dataAccess = function(){
        return dataservice[self.collection].get(self.context);
    };
    
    var loadItems = function() {
        return self.dataAccess().then(function(items) {
            self.items(items);
            self.navigator.populate(items, self.showLeftArrow(), self.showRightArrow());
            self.activeItem(self.navigator.getActiveItem());
        });
    };

    this.eventHandlers = {
        pageLeft: function() {
            self.context.page(self.context.page() > 0 ? self.context.page() - 1 : 0);
            loadItems().then(self.eventHandlers.navigationMove);
        },
        pageRight: function() {
            self.context.page(self.context.page() + 1);
            loadItems().then(self.eventHandlers.navigationMove);
        },
        navigationMove: function() {
            self.activeItem(self.navigator.getActiveItem());
        }
    };

    this.init = function() {
        globalNavViewModel.init();
        loadItems().then(function() {
            $("body").fadeIn(function() {
                self.eventHandlers.navigationMove();
            });
        });
        $(document).on("page-right", self.eventHandlers.pageRight);
        $(document).on("page-left", self.eventHandlers.pageLeft);
        $(document).on("navigation-move", self.eventHandlers.navigationMove);
    };
};

module.exports = GridViewModel;
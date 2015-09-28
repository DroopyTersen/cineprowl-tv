var GridNavigator = require("../navigators/gridNavigator");
var dataservice = require("../services/dataservice");
var config = require("../config");

var GridViewModel = function() {
	var self = this;
	self.observables = {
		activeItem: {},
		items: [],
		context: {
			page: 1
		},
        globalNav: config.globalNav
	};
	self.navigator = new GridNavigator();
	
	this.shouldShowLeftArrow = function(){
		return self.observables.context.page > 1;	
	};
	this.shouldShowRightArrow = function() {
		return self.observables.items.length === 10;
	};
	this.getSelectedItem = function() {
        if (self.observables.activeItem) {
            if ($("#" + self.observables.activeItem.id).hasClass("grid-item")) {
                return self.observables.activeItem;
            }
        }
        return self.emptyItem;
	};
    
	this.dataAccess = function(){
        return dataservice[self.collection].get(self.observables.context);
    };
	this.emptyItem = {
        name: "",
        id: "",
        title: "",
        backdrop: ""
    };
	
	var loadItems = function() {
        return self.dataAccess().then(function(items) {
            self.observables.items = items;
            self.navigator.populate(items, self.shouldShowLeftArrow, self.shouldShowRightArrow());
            self.observables.activeItem = self.navigator.getActiveItem();
        });
    };
	
	this.eventHandlers = {
        pageLeft: function() {
            self.observables.context.page = self.observables.context.page > 1 ? self.observables.context.page - 1 : 1;
            loadItems().then(self.eventHandlers.navigationMove);
        },
        pageRight: function() {
            self.observables.context.page = self.observables.context.page + 1;
            loadItems().then(self.eventHandlers.navigationMove);
        },
        navigationMove: function() {
            self.observables.activeItem = self.navigator.getActiveItem();
        }
    };
	
	this.init = function() {
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
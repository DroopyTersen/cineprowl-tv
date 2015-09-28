var dataservice = require("../services/dataservice");
var GridViewModel = require("./gridViewModel");
var qs = require("querystring");

var MoviesViewModel = function() {
	var self = this;
	GridViewModel.call(this);
    self.collection = "movies";
	
    self.observables.context.sort = "addedToDb";
    self.observables.context.filter = {};
    self.observables.context.search = "";

	var processQueryString = function() {
        var params = qs.parse(window.location.search.substring(1));
        if (params.search) {
            self.observables.context.search = params.search;
        }
        if (typeof params.watched !== 'undefined') {
            self.observables.context.filter = {
                watched: (params.watched === "true")
            };
        }
        if (typeof params.genre !== 'undefined') {
            self.observables.context.filter.genre = params.genre;
        }
    };
    
    //smoothly handle background image changing
    this.eventHandlers.navigationMove = function() {
        self.observables.activeItem = self.navigator.getActiveItem();
        $(".background.backdrop").fadeOut(function(){
            $(".background.backdrop").remove();
            var $img = $("<img style='display:none' class='background backdrop' />")
                .load(function(){
                    $(".background.backdrop").fadeIn();
                })
                .attr('src',  self.getSelectedItem().backdrop);  
            $("#backgrounds").append($img);
        });
    };
    
    
    processQueryString();
    this.init();
};

module.exports = MoviesViewModel;
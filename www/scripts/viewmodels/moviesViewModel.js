var dataservice = require("../services/dataservice");
var GridViewModel = require("./gridViewModel");

var MoviesViewModel = function() {
	var self = this;
	GridViewModel.call(this);
    self.collection = "movies";
    self.observables.context.message = self.observables.context.toWords();
    
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
    
    this.init();
};

module.exports = MoviesViewModel;
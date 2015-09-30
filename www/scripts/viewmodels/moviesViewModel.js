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
        $(".background.backdrop").removeClass("showing");
        setTimeout(function(){
            $(".background.backdrop").remove();
            var $img = $("<img class='background backdrop fade' />")
                .load(function(){
                    $(".background.backdrop").addClass("showing");
                })
                .attr('src',  self.getSelectedItem().backdrop);  
            $("#backgrounds").append($img);
        }, 300);
    };
    
    this.init();
};

module.exports = MoviesViewModel;
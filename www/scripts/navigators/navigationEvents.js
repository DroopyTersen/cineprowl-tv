var $ = require("jquery-browserify");
exports.bindEvents = function(navigator) {
    $(document).on("keydown", function(e) {
        switch(e.which) {
            case 37: // left
            navigator.moveLeft()
            $(document).trigger("navigation-move");
            break;
    
            case 38: // up
            navigator.moveUp();
            $(document).trigger("navigation-move");
            break;
    
            case 39: // right
            navigator.moveRight();
            $(document).trigger("navigation-move");
            break;
    
            case 40: // down
            navigator.moveDown();
            $(document).trigger("navigation-move");
            break;
            
            case 13: //enter
            navigator.select();
             $(document).trigger("navigation-select");
            break;
    
            default: return; // exit this handler for other keys
        }
        //e.preventDefault(); // prevent the default action (scroll / move caret)
    });
};
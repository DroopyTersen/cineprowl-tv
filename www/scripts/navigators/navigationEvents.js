var $ = require("jquery-browserify");
exports.bindEvents = function(navigator) {
    $(document).on("keydown", function(e) {
        switch(e.which) {
            case 37: // left
            navigator.moveLeft()
            break;
    
            case 38: // up
            navigator.moveUp();
            break;
    
            case 39: // right
            navigator.moveRight();
            break;
    
            case 40: // down
            navigator.moveDown();
            break;
            
            case 13: //enter
            navigator.select();
            break;
    
            default: return; // exit this handler for other keys
        }
        e.preventDefault(); // prevent the default action (scroll / move caret)
    });
};
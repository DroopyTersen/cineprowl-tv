var $ = require("jquery-browserify");
var ko = require("knockout");

var templater = function() {
    var insertHtml = function(templateName, element) {
        return $.get("/templates/" + templateName + ".html")
            .then(function(html){
                $(element).html(html);
            });
    }
    
    var bindElement = function(viewModel, templateName, element) {
        insertHtml(templateName, element).then(function(){
            ko.applyBindings(viewModel, element);
        });
    }
    
    return { 
        insertHtml: insertHtml,
        bindElement: bindElement
    };
}

module.exports = templater();

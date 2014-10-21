var queryString = require("../services/queryString");
var dataservice = require("../services/dataservice");
var globalNavViewModel = require("./globalNavViewModel");
var ko = require("knockout");

var MoviesViewModel = function() {
    var self = this;
    
    var context = {
        sort: "addedToDb",
        filter: null,
        search: "",
        page: 0
    }
    
    this.sort = ""
    this.filter = {};
    this.search = "";
    this.movies = ko.observableArray([]);
    
    var processQueryString = function(){
        if (queryString.contains("search")) {
            context.search = queryString.getValue("search");
        }
    };
    
    var init = function() {
        globalNavViewModel.init();
        processQueryString();
        dataservice.movies.get(context).then(function(movies){
            self.movies(movies);
        });
    }
    
    init();
}

module.exports = MoviesViewModel;
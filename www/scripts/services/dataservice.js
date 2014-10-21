var $ = require("jquery-browserify");
var config = require("../config");
var imageHelper = require("CineProwl-Models").imageHelper;

var dataservice = function() {
    var _allMovies = [];
    
    var movies = {
        getAll: function() {
            return $.getJSON(config.apiUrl + "/movies?$select=title,id,backdrop_path")
                .then(function(movies){
                    _allMovies = movies;
                    _allMovies.forEach(function(movie){
                        movie.backdrop = imageHelper.backdrop.getFull(movie.backdrop_path);
                    })
                    return _allMovies;
                });
        },
        all: function() {
            return _allMovies;
        },
        getRandom: function() {
            var deferred = new $.Deferred();
            if (_allMovies.length) {
                var randomIndex = Math.floor(Math.random() * _allMovies.length) + 1;
                deferred.resolve(_allMovies[randomIndex]);
            } else {
                movies.getAll().then(function(){
                    var randomIndex = Math.floor(Math.random() * _allMovies.length) + 1;
                    deferred.resolve(_allMovies[randomIndex]);
                });
            }
            
            return deferred.promise();
        }
    };
    
    //preload it
    movies.getAll();
    
    return {
        movies: movies
    };
};

module.exports = dataservice();
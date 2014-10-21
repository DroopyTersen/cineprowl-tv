var $ = require("jquery-browserify");
var config = require("../config");
var imageHelper = require("CineProwl-Models").imageHelper;

var dataservice = function() {
    var _allMovies = [];
    var pageSize = 10;
    
    var processMovies = function(movies){
        movies.forEach(function(movie){
            movie.url = "/www/details.html?id=" + movie.id;
            movie.poster = imageHelper.buildLink("w342", movie.poster_path);
            movie.backdrop = imageHelper.backdrop.getFull(movie.backdrop_path);
        });
    };
    
    var movies = {
        getAll: function() {
            return $.getJSON(config.apiUrl + "/movies?$select=title,id,poster_path,backdrop_path&$top=2000")
                .then(function(movies){
                    _allMovies = movies;
                    processMovies(_allMovies);
                    return _allMovies;
                });
        },
        all: function() {
            return _allMovies;
        },
        getRandom: function() {
            var deferred = new $.Deferred();
            if (_allMovies.length) {
                var randomIndex = Math.floor((Math.random() * 1000 * _allMovies.length) % _allMovies.length);
                deferred.resolve(_allMovies[randomIndex]);
            } else {
                movies.getAll().then(function(){
                    var randomIndex = Math.floor((Math.random() * 1000 * _allMovies.length) % _allMovies.length);
                    deferred.resolve(_allMovies[randomIndex]);
                });
            }
            
            return deferred.promise();
        },
        search: function(searchText, page) {
            var deferred = new $.Deferred();
            
            var filterAllMovies = function() {
                var matches = _allMovies.filter(function(movie){
                    return (movie.title.toLowerCase().indexOf(searchText.toLowerCase()) !== -1)
                });
                
                page = page || 0;
                var start = page * pageSize;
                var end = ((page + 1) * pageSize);
                var pagedMatches = matches.slice(start, end);
                deferred.resolve(pagedMatches);
            };
            
            if (_allMovies.length) {
                filterAllMovies();
            } else {
                movies.getAll().then(filterAllMovies);
            }
            
            return deferred.promise();
        },
        get: function(context){
            if (context.search) {
                return movies.search(context.search, context.page);
            }
            
        }
    };
    
    //preload it
    //movies.getAll();
    
    return {
        movies: movies
    };
};

module.exports = dataservice();
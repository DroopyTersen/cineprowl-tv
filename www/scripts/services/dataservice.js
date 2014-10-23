var $ = require("jquery-browserify");
var config = require("../config");
var imageHelper = require("CineProwl-Models").imageHelper;
var cache = require("./cache").sessionStorage;

var dataservice = function() {
    var _allMovies = [];
    var pageSize = 10;
    var cacheKey = "cineprowl-allmovies";
    
    var processMovies = function(movies) {
        movies.forEach(function(movie) {
            movie.url = "/details.html?id=" + movie.id;
            movie.poster = imageHelper.buildLink("w342", movie.poster_path);
            movie.backdrop = imageHelper.backdrop.getFull(movie.backdrop_path);
        });
        return movies;
    };

    var pageMovies = function(matches, page) {
        page = page || 0;
        var start = page * pageSize;
        var end = ((page + 1) * pageSize);
        return matches.slice(start, end);
    };
    var moviesLoaded = new $.Deferred();
    
    var loadAll = function() {
        var orderby = "&$orderby=addedToDb desc";
        return $.getJSON(config.apiUrl + "/movies?$select=title,id,poster_path,backdrop_path,watched,rating,addedToDb&$top=2000" + orderby)
            .then(processMovies); 
    }
    var movies = {
        getAll: function(sort) {
            var cachedValue = cache.getObject(cacheKey);
            if (cachedValue != null) {
                _allMovies = cachedValue;
                moviesLoaded.resolve(cachedValue);
            } else {
                loadAll().then(function(movies){
                    _allMovies = movies;
                    cache.setObject(cacheKey, _allMovies);
                    moviesLoaded.resolve(_allMovies);
                });
            }
            
            return moviesLoaded.promise();
            var orderby = sort || "&$orderby=addedToDb desc";
            return $.getJSON(config.apiUrl + "/movies?$select=title,id,poster_path,backdrop_path,watched,rating,addedToDb&$top=2000" + orderby)
                .then(function(movies) {
                    _allMovies = movies;
                    processMovies(_allMovies);
                    return _allMovies;
                });
        },
        all: function() {
            return _allMovies;
        },
        getRandom: function() {
            return moviesLoaded.then(function(){
                var randomIndex = Math.floor((Math.random() * 1000 * _allMovies.length) % _allMovies.length);
                return _allMovies[randomIndex]
            });
        },
        search: function(searchText, page) {
            return moviesLoaded.then(function(){
                var matches = _allMovies.filter(function(movie) {
                    return (movie.title.toLowerCase().indexOf(searchText.toLowerCase()) !== -1)
                });
                return pageMovies(matches, page);
            });
        },
        unwatched: function(page) {
            return moviesLoaded.then(function(){
                var matches = _allMovies.filter(function(movie) {
                    return movie.watched == false;
                });
                return pageMovies(matches, page);
            });
        },
        get: function(context) {
            if (context.search) {
                return movies.search(context.search, context.page());
            } else if (context.filter && context.filter.watched === false) {
                return movies.unwatched(context.page());
            } else {
                return movies.getAll().then(function(){
                    return pageMovies(_allMovies, context.page());
                })
            }
        },
        byId: function(id) {
            return moviesLoaded.then(function(){
                var matches = _allMovies.filter(function(movie) {
                    return movie.id == id;
                });
                return matches[0]
            });
        }
    };

    //preload it
    movies.getAll();

    return {
        movies: movies
    };
};

module.exports = dataservice();
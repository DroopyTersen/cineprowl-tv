var $ = require("jquery-browserify");
var config = require("../config");
var imageHelper = require("CineProwl-Models").imageHelper;
var cache = require("./cache").sessionStorage;

var dataservice = function() {
    var _allMovies = [];
    var pageSize = 10;
    var cacheKey = "cineprowl-allmovies";

    var processMovies = function(movies) {
        movies.forEach(processMovie);
        return movies;
    };

    var processMovie = function(movie) {
        movie.url = "/details.html?id=" + movie.id;
        movie.poster = imageHelper.buildLink("w342", movie.poster_path);
        movie.backdrop = imageHelper.backdrop.getMid(movie.backdrop_path);
        return movie;
    };

    var pageMovies = function(matches, page) {
        page = page || 0;
        var start = page * pageSize;
        var end = ((page + 1) * pageSize);
        return matches.slice(start, end);
    };
    var moviesLoaded = new $.Deferred();

    var loadOne = function(id) {
        return $.getJSON(config.apiUrl + "/movies/" + id)
            .then(processMovie);
    };

    var loadAll = function() {
        var orderby = "&$orderby=addedToDb desc";
        return $.getJSON(config.apiUrl + "/movies?$select=title,id,poster_path,backdrop_path,watched,rating,addedToDb,genres&$top=2000" + orderby)
            .then(processMovies);
    };
    var movies = {
        getAll: function(sort) {
            var cachedValue = cache.getObject(cacheKey);
            if (cachedValue !== null) {
                _allMovies = cachedValue;
                moviesLoaded.resolve(cachedValue);
            } else {
                loadAll().then(function(movies) {
                    _allMovies = movies;
                    cache.setObject(cacheKey, _allMovies);
                    moviesLoaded.resolve(_allMovies);
                });
            }

            return moviesLoaded.promise();
        },
        all: function() {
            return _allMovies;
        },
        getRandom: function() {
            return moviesLoaded.then(function() {
                var randomIndex = Math.floor((Math.random() * 1000 * _allMovies.length) % _allMovies.length);
                return _allMovies[randomIndex];
            });
        },
        filters: {
            search: function(movie, searchText) {
                    return (movie.title.toLowerCase().indexOf(searchText.toLowerCase()) !== -1);
            },
            byId: function(movie, id) {
                return movie.id == id;
            },
            unwatched: function(movie) {
                    return movie.watched == false;
            }
        },
        get: function(context) {
            return moviesLoaded.then(function(){
                var results = _allMovies;
                console.log(_allMovies.length);
                if (context.search()) {
                    results = results.filter(function(movie) {
                        return movies.filters.search(movie, context.search());
                    });
                }
                if (context.filter() && context.filter().watched === false) {
                   results = results.filter(movies.filters.unwatched);
                }

                return pageMovies(results, context.page());
            });
    
        },
        byId: function(id) {
            return loadOne(id);
        }
    };

    //preload it
    movies.getAll();

    return {
        movies: movies
    };
};

module.exports = dataservice();
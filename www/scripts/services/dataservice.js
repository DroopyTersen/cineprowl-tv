var $ = require("jquery-browserify");
var config = require("../config");
var imageHelper = require("CineProwl-Models").imageHelper;
var cache = require("./cache").sessionStorage;

var dataservice = function() {
    var _allMovies = [];
    var _allGenres = [];
    var pageSize = 10;
    var cacheKey = "cineprowl-allmovies";
    var genreCacheKey = "cineprowl-genres";

    var moviesLoaded = new $.Deferred();
    var genresLoaded = new $.Deferred();


    /* === DATA PROCESSING === */
    var processMovies = function(movies) {
        movies.forEach(processMovie);
        return movies;
    };
    var processMovie = function(movie) {
        movie.url = "/details.html?id=" + movie.id;
        //movie.poster = imageHelper.buildLink("w342", movie.poster_path);
        movie.poster = imageHelper.poster.getMid(movie.poster_path);
        movie.backdrop = imageHelper.backdrop.getMid(movie.backdrop_path);
        return movie;
    };
    var processGenres = function(genres) {
        genres.forEach(processGenre);
        genres = genres.filter(function(genre) {
            return genre.count > 4;
        });
        genres.sort(function(a, b) {
            return a.name < b.name ? -1 : 1;
        })
        return genres;
    };
    var processGenre = function(genre) {
        genre.url = "/movies.html?genre=" + genre.name;
        genre.id = "genre-" + genre.name;
        return genre;
    };

    var pageItems = function(matches, page) {
        page = page || 0;
        var start = page * pageSize;
        var end = ((page + 1) * pageSize);
        return matches.slice(start, end);
    };

    /* === AJAX === */
    var loadOne = function(id) {
        return $.getJSON(config.apiUrl + "/movies/" + id)
            .then(processMovie);
    };

    var loadAll = function() {
        var orderby = "&$orderby=addedToDb desc";
        return $.getJSON(config.apiUrl + "/movies?$select=title,id,poster_path,backdrop_path,watched,rating,addedToDb,genres&$top=2000" + orderby)
            .then(processMovies);
    };

    /* === MOVIES === */
    var movies = {
        getAll: function(sort) {
            var cachedValue = cache.getObject(cacheKey);
            if (cachedValue !== null) {
                _allMovies = cachedValue;
                moviesLoaded.resolve(cachedValue);
            }
            else {
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
            },
            genre: function(movie, genre) {
                var match = false;
                movie.genres.forEach(function(g){
                    if (g.name === genre) match = true;
                })
                return match;
            }
        },
        get: function(context) {
            return moviesLoaded.then(function() {
                var results = _allMovies;
                if (context.search()) {
                    results = results.filter(function(movie) {
                        return movies.filters.search(movie, context.search());
                    });
                }
                if (context.filter()){
                    if (context.filter().watched === false) {
                        results = results.filter(movies.filters.unwatched);
                    }
                    if (context.filter().genre) {
                        results = results.filter(function(movie) {
                            return movies.filters.genre(movie, context.filter().genre);
                        });
                    }
                }
                return pageItems(results, context.page());
            });

        },
        byId: function(id) {
            return loadOne(id);
        }
    };



    /* === GENRES === */
    var genres = {
        get: function(page){
            return genresLoaded.then(function(){
               return pageItems(_allGenres, page);
            });
        },
        getAll: function() {
            var cachedValue = cache.getObject(genreCacheKey);
            if (cachedValue !== null) {
                _allGenres = cachedValue;
                genresLoaded.resolve(cachedValue);
            }
            else {
                var url = config.apiUrl + "stats";
                $.getJSON(url).then(function(stats) {
                    _allGenres = processGenres(stats.genres);
                    cache.setObject(genreCacheKey, _allGenres);
                    genresLoaded.resolve(_allGenres);
                });
            }
            return genresLoaded.promise();
        }
    };
    
        //preload it
    movies.getAll();
    genres.getAll();
    
    return {
        movies: movies,
        genres: genres
    };
};

module.exports = dataservice();

var config = {
    globalNav: [{
        title: "Home",
        url: "/home.html",
        id: "global-nav-home"
    },{
        title: "Unwatched",
        url: "/movies.html?watched=false",
        id: "global-nav-unwatched"
    },{
        title: "Genres",
        url: "/Genres.html",
        id: "global-nav-genres"
    },{
        title: "Recent",
        url: "/movies.html?sort=addedToDb",
        id: "global-nav-recent"
    }],
    apiUrl: "https://cineprowl-api-c9-andrew-petersen.c9.io",
    streamUrl: "http://runwatcher.com:8081/stream/",
    playUrl: "http://localhost:5000/omc/"
};

module.exports = config;
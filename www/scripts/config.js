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
        url: "/genres.html",
        id: "global-nav-genres"
    },{
        title: "Recent",
        url: "/movies.html?sort=addedToDb",
        id: "global-nav-recent"
    }],
    apiUrl: "//cineprowlapi.azurewebsites.net/",
    streamUrl: "http://runwatcher.com:8081/stream/"
};

module.exports = config;
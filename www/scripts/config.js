var config = {
    globalNav: [{
        title: "Home",
        url: "/www/home.html",
        id: "global-nav-home",
        icon: "<img src='/www/images/logo-diagonal.png' class='logo'>"
    },{
        title: "Unwatched",
        url: "/www/movies.html?watched=false",
        id: "global-nav-unwatched",
        icon: ""
    },{
        title: "Genres",
        url: "/www/Genres.html",
        id: "global-nav-genres",
        icon: ""
    },{
        title: "Recent",
        url: "/www/movies.html?sort=addedToDb",
        id: "global-nav-recent",
        icon: ""
    }],
    apiUrl: "https://cineprowl-api-c9-andrew-petersen.c9.io"
};

module.exports = config;
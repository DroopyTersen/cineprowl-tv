var qs = require("querystring");
var MovieContext = function() {
	this.page = 1;
	this.sort = "addedToDb";
	this.filter = {};
};

MovieContext.prototype.toWords = function() {
	var items = [];

	if (this.filter.watched === false) {
		items.push("unwatched");
	}
	if (this.filter.genre) {
		items.push(this.filter.genre);
	}
	if (this.search) {
		items.push("'" + this.search + "'");
	}
	if (this.actorId && this.actor) {
		items.push(this.actor);
	}
	
	if (items.length === 0 && this.sort === "addedToDb") {
		items.push("recently added");
	}
	return "Showing " + items.join(", ") + " movies";
};

MovieContext.prototype.fromUrl = function() {
	var params = qs.parse(window.location.search.substring(1));
	if (params.search) {
		this.search = params.search;
	}
	if (params.page) {
		this.page = parseInt(params.page, 10);
	}
	if (typeof params.watched !== 'undefined') {
		this.filter = {
			watched: (params.watched === "true")
		};
	}
	if (typeof params.genre !== 'undefined') {
		this.filter.genre = params.genre;
	}
	if (params.sort) {
		this.sort = params.sort;
	}
	if (params.actorId) {
		this.actorId = params.actorId;
		this.actor = params.actor || "";
	}
};

MovieContext.prototype.toUrl = function() {
	var params = [];
	if (this.search) {
		params.push("search=" + encodeURIComponent(this.search));
	}
	if (this.page) {
		params.push("page=" + this.page);
	}
	if (this.filter && typeof this.filter.watched !== 'undefined') {
		params.push("watched=" + this.filter.watched);
	}
	if (this.filter && this.filter.genre) {
		params.push("genre=" + this.filter.genre);
	}
	if (this.sort) {
		params.push("sort=" + this.sort);
	}
	if (this.actorId) {
		params.push("actorId=" + this.actorId);
		params.push("actor=" + this.actor);
	}
	var queryString = "?" + params.join("&");
	return window.location.origin + window.location.pathname + queryString;
};

module.exports = MovieContext;
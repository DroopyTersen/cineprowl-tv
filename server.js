var express = require("express");
var omx = require("omxcontrol");

var EXPRESS_PORT = process.env.PORT || 5000;
var HOST = process.env.IP || "localhost"
var startExpress = function() {
	var express = require("express");
	var app = express();
	//this makes our static files servable
	app.use(express.static(__dirname + "/www"));
	app.get("/omc/:id", function(req, res){
	    var streamUrl = "http://runwatcher.com:8081/stream/" + req.params.id;
	    
	    //comment this out
	    var omx = {
	        play: function(filepath) { console.log(filepath); }
	    };
	    omx.play(streamUrl + req.params.id);
	});
	//this starts the server
	app.listen(EXPRESS_PORT);
	console.log("Server started on port " + EXPRESS_PORT);
};

startExpress();
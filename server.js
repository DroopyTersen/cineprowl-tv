var express = require("express");
var omx = require("omxcontrol");

var EXPRESS_PORT = 5000;

var startExpress = function() {
	var express = require("express");
	var app = express();
	//this makes our static files servable
	app.use(express.static(__dirname + "/www"));
	app.get("/omc/:id", function(req, res) {
		var streamUrl = "http://runwatcher.com:8081/stream/" + req.params.id;

		//comment this out
		var omx = {
			play: function(filepath) {
				runShell("C:\\VLC\\vlc.exe", [filepath]);
			}
		};
		omx.play(streamUrl);
	});
	//this starts the server
	if (process.env.IP) app.listen(process.env.PORT, process.env.IP);
	else app.listen(EXPRESS_PORT);
	
	console.log("Server started on port " + process.env.PORT);
};

//Run and pipe shell script output 
function runShell(cmd, args, cb, end) {
	end = end || function() {};
	var spawn = require('child_process').spawn,
			child = spawn(cmd, args),
			self = this;
	
	child.stdout.on('data', function(buffer) {
		if (cb) {
			cb(self, buffer);
		}
	});

	child.stdout.on('end', end);
}
startExpress();
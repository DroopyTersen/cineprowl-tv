var express = require("express");
var omx = require("omxcontrol");

var EXPRESS_PORT = 5000;

var startExpress = function() {
	var express = require("express");
	var app = express();
	//this makes our static files servable
	app.use(express.static(__dirname + "/www"));
	
	omx.mapKey('volumeup',"+");
	omx.mapKey("volumedown", "-");
	omx.mapKey('leftseek',"$'\\x1b\\x5b\\x44'");
	omx.mapKey('rightseek',"$'\\x1b\\x5b\\x43'");
	omx.mapKey('downseek',"$'\\x1b\\x5b\\x42'");
	omx.mapKey('upseek',"$'\\x1b\\x5b\\x41'");
	app.use(omx());
	app.use("/vlc/:id", function(req, res){
		var filepath = "http://runwatcher.com:8081/stream/" + req.params.id;
		console.log(filepath);
		launchVlc(filepath);
	});
	//this starts the server
	if (process.env.IP) app.listen(process.env.PORT, process.env.IP);
	else app.listen(EXPRESS_PORT);
	
	console.log("Server started on port " + process.env.PORT);
};

var launchVlc = function(filepath) {
	var params = " -f " + " " + filepath,
		exePath = '"C:\\Program Files\\VideoLAN\\VLC\\vlc.exe"',
		exec = require('child_process').exec;

	var child = exec(exePath + params, function(err, stdout, stderr) {
		if (err) {
			console.log(err);
			console.log(stderr);
		}
	});
};
startExpress();

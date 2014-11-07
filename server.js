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

	//this starts the server
	if (process.env.IP) app.listen(process.env.PORT, process.env.IP);
	else app.listen(EXPRESS_PORT);
	
	//runShell("chromium", ["--kiosk", "http://localhost:5000/home.html"]);
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

console.log("Hello World!");

var MT = createClass("MT", "js");
MT.require("Core");
MT.require("Socket");
MT.require("ui.UIController");
MT.require("core.Project");

MT.onReady(main);


function main(){
	var socket = new MT.Socket();
	var ui = window.ui = new MT.ui.UIController();
	
	new MT.core.Project(ui, socket);
	
	socket.on("open", function(){
		console.log("connection opened");
	});
	
	socket.onMessage(function(data){
		console.log("message:", data);
	});
	
	socket.on("Sock", function(data){
		//console.log("Sock", data);
	});
}
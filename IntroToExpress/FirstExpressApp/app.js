var express = require("express");
var app = express();


app.get("/", function(req, res){
	res.send("Hi there!");	
});


app.get("/bye", function(req, res){
	res.send("Goodbye!");	
});

app.get("/dog", function(req, res){
	res.send("Meow!");	
});

app.get("*", function(req, res){
	res.send("You are a star!");	
});





app.listen(3000, function() { 
  console.log('Server listening on port 3000'); 
});
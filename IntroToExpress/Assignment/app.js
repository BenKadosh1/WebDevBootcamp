var express = require("express");
var app = express();

app.get("/", function(req, res){
	res.send("Hi there, welcome to my assignment!");
});

// anything with /speak/:param
// if pig then this 
app.get("/speak/:animal", function(req, res){
	var dict = {
		pig: "Oink",
		cow: "Moo",
		dog: "Woof Woof!",
		cat: "Meow",
		bird: "Chirp"
	};
	
	var animal = req.params.animal.toLowerCase();
	var output = dict[animal];
	
	// console.log(dict.cat);
	// console.log(animal, output);
	
	if(typeof output === 'undefined'){
		res.send("I don't know what the " + animal + " says :\(");
	}
	else{
		res.send("The " + animal + " says '"+ output + "'");
	}
});

app.get("/repeat/:string/:count", function(req, res){
	var retString = "";
	var repString = req.params.string;
	var repNum = req.params.count;
	
	for(var i = 0; i<repNum-1; i++){
		retString += (repString + " ");
	}
	retString += repString;
	
	res.send(retString);
});


app.get("*", function(req, res){
	res.send("Sorry, page not found... What are you doing with your life?");
});


app.listen(3000, function(){
	console.log("Listening on port 3000");
});
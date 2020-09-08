var express = require("express");
var app = express();
var bodyParser = require("body-parser");

app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine", "ejs");


var campgrounds = [
	{name:"Salmon Creek", image: "https://images.pexels.com/photos/2419278/pexels-photo-2419278.jpeg?auto=compress&cs=tinysrgb&h=350" },
	{name:"Granite Hill", image: "https://pixabay.com/get/57e1dd4a4350a514f1dc84609620367d1c3ed9e04e507440722e79d4924ac6_340.jpg" },
	{name:"Mountain Goat's Rest", image: "https://images.pexels.com/photos/618848/pexels-photo-618848.jpeg?auto=compress&cs=tinysrgb&h=350"}
];


app.get("/", function(req, res){
	res.render("landing");
});

app.get("/campgrounds", function(req,res){
	res.render("campgrounds", {campgrounds:campgrounds});
});


app.post("/campgrounds", function(req, res){
	var name = req.body.name;
	var image = req.body.image;
	var newCampground = {name: name, image: image};
	
	campgrounds.push(newCampground);
	
	res.redirect("/campgrounds");
});


app.get("/campgrounds/new", function(req,res){
	res.render("new");
});



app.listen(3000, function(){
	console.log("Listening on port 3000");
});




// <%- include("partials/header") %>
// <%- include("partials/footer") %>
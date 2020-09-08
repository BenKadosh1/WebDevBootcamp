var express = require("express"),
	app = express(),
	bodyParser = require("body-parser");



const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/yelp_camp', {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => console.log('Connected to DB!'))
.catch(error => console.log(error.message));


app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine", "ejs");


var CampgroundSchema = new mongoose.Schema({
	name: String,
	image: String,
	description: String
});

var Campground = mongoose.model("Campground", CampgroundSchema);


// Campground.create(
// 	{
// 		name: "Salmon Creek", 
// 		image: "https://images.pexels.com/photos/2419278/pexels-photo-2419278.jpeg?auto=compress&cs=tinysrgb&h=350",
// 		description: "Salmon Creek for fishing"
// 	}, function(err, campground){
// 		if(err){
// 			console.log(err);
// 		}
// 		else{
// 			console.log("Newly created campground");
// 			console.log(campground);
// 		}
// 	}
// )



// var campgrounds = [
// 	{name:"Salmon Creek", image: "https://images.pexels.com/photos/2419278/pexels-photo-2419278.jpeg?auto=compress&cs=tinysrgb&h=350" },
// 	{name:"Granite Hill", image: "https://pixabay.com/get/57e1dd4a4350a514f1dc84609620367d1c3ed9e04e507440722e79d4924ac6_340.jpg" },
// 	{name:"Mountain Goat's Rest", image: "https://images.pexels.com/photos/618848/pexels-photo-618848.jpeg?auto=compress&cs=tinysrgb&h=350"}
// ];
 

app.get("/", function(req, res){
	res.render("landing");
});

app.get("/campgrounds", function(req,res){
	Campground.find({}, function(err, allCampgrounds){
		if(err){
			console.log(err);
		}
		else{
			res.render("index", {campgrounds:allCampgrounds});
		}	
	});
	// res.render("campgrounds", {campgrounds:campgrounds});
});


app.post("/campgrounds", function(req, res){
	var name = req.body.name;
	var image = req.body.image;
	var desc = req.body.description;
	var newCampground = {name: name, image: image, description:desc};
	
	// campgrounds.push(newCampground);
	
	Campground.create(newCampground, function(err, newlyCreated){
		if(err){
			console.log(err);
		}
		else{
			res.redirect("/campgrounds");
		}
	});
});


app.get("/campgrounds/new", function(req,res){
	res.render("new");
});



app.get("/campgrounds/:id", function(req,res){
	Campground.findById(req.params.id, function(err, foundCampground){
		if(err){
			console.log(err);
		}
		else{
			res.render("show", {campground:foundCampground});
		}
	});
	
});










app.listen(3000, function(){
	console.log("Listening on port 3000");
});




// <%- include("partials/header") %>
// <%- include("partials/footer") %>
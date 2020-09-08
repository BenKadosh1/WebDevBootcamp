var express = require("express");
var router = express.Router({mergeParams:true});

var Campground 		= require("../models/campground");


router.get("/", function(req,res){
	Campground.find({}, function(err, allCampgrounds){
		if(err){
			console.log(err);
		}
		else{
			res.render("campgrounds/index", {campgrounds:allCampgrounds, currentUser: req.user});
		}	
	});
	// res.render("campgrounds", {campgrounds:campgrounds});
});


router.post("/", function(req, res){
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


router.get("/new", function(req,res){
	res.render("campgrounds/new");
});



router.get("/:id", function(req,res){
	Campground.findById(req.params.id).populate("comments").exec(function(err, foundCampground){
		if(err){
			console.log(err);
		}
		else{
			console.log(foundCampground);
			res.render("campgrounds/show", {campground:foundCampground});
		}
	});
	
});


module.exports = router;
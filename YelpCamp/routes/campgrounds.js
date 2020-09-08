var express = require("express");
var router = express.Router({mergeParams:true});

var middleware 		= require("../middleware");
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


router.post("/", middleware.isLoggedIn,function(req, res){
	var name = req.body.name;
	var price = req.body.price;
	var image = req.body.image;
	var desc = req.body.description;
	var author = {
		id: req.user._id,
		username: req.user.username
	}
	var newCampground = {name: name, price: price, image: image, description:desc, author:author};
	
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


router.get("/new", middleware.isLoggedIn,function(req,res){
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

//edit and update campground routes


//edit
router.get("/:id/edit", middleware.checkCampgroundOwnership,function(req, res){
	//if user is authenticated render the edit page
	Campground.findById(req.params.id, function(err, foundCampground){
		res.render("campgrounds/edit", {campground: foundCampground});
	});
});


//update
router.put("/:id", middleware.checkCampgroundOwnership,function(req, res){
	Campground.findByIdAndUpdate(req.params.id, req.body.campground, function(err, updatedCampground){
		if(err){
			res.redirect("/campgrounds");
		}
		else{
			res.redirect("/campgrounds/"+req.params.id);
		}
	});
});

//destroy campground route
router.delete("/:id", middleware.checkCampgroundOwnership,function(req,res){
	Campground.findByIdAndRemove(req.params.id, function(err){
		if(err){
			res.redirect("/campgrounds");
		}
		else{
			res.redirect("/campgrounds");
		}
	});
});


module.exports = router;
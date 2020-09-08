var express = require("express"),
	app = express(),
	bodyParser = require("body-parser"),
	Campground = require("./models/campground"),
	Comment = require("./models/comment"),
	seedDB = require("./seeds");


seedDB();

const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/yelp_camp', {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => console.log('Connected to DB!'))
.catch(error => console.log(error.message));


app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine", "ejs");
 

app.get("/", function(req, res){
	res.render("landing");
});

app.get("/campgrounds", function(req,res){
	Campground.find({}, function(err, allCampgrounds){
		if(err){
			console.log(err);
		}
		else{
			res.render("campgrounds/index", {campgrounds:allCampgrounds});
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
	res.render("campgrounds/new");
});



app.get("/campgrounds/:id", function(req,res){
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



//comment routes
app.get("/campgrounds/:id/comments/new", function(req, res){
	Campground.findById(req.params.id, function(err,campground){
		if(err){
			console.log(err);
		}
		else{
			res.render("comments/new", {campground:campground});
		}
	});
});

app.post("/campgrounds/:id/comments", function(req, res){
	Campground.findById(req.params.id, function(err, campground){
		if(err){
			console.log(err);
			res.redirect("/campgrounds");
		}
		else{
			Comment.create(req.body.comment, function(err,comment){
				if(err){
					console.log(err);
				}
				else{
					campground.comments.push(comment);
					campground.save();
					res.redirect('/campgrounds/'+campground._id);
				}
			});
		}
	});
});
























app.listen(3000, function(){
	console.log("Listening on port 3000");
});




// <%- include("partials/header") %>
// <%- include("partials/footer") %>
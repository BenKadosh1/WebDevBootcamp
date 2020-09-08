var express 		= require("express"),
	app 			= express(),
	bodyParser 		= require("body-parser"),
	Campground 		= require("./models/campground"),
	Comment 		= require("./models/comment"),
	seedDB 			= require("./seeds"),
	passport 		= require("passport"),
	LocalStrategy 	= require("passport-local"),
	User 			= require("./models/user")
	methodOverride 	= require("method-override") ;



var commentRoutes 		= require("./routes/comments"),
	campgroundRoutes 	= require("./routes/campgrounds"),
	indexRoutes 		= require("./routes/index");


const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/yelp_camp', {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => console.log('Connected to DB!'))
.catch(error => console.log(error.message));


app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine", "ejs");
app.use(express.static(__dirname + "/public"));
app.use(methodOverride("_method"));

//seedDB();


//Passport config
app.use(require("express-session")({
	secret: "Ben's little secret",
	resave: false,
	saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());

passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());


app.use(function(req, res, next){
	res.locals.currentUser = req.user;
	next();
});


app.use("/",indexRoutes);
app.use("/campgrounds", campgroundRoutes);
app.use("/campgrounds/:id/comments", commentRoutes);


app.listen(3000, function(){
	console.log("Listening on port 3000");
});


// <%- include("partials/header") %>
// <%- include("partials/footer") %>
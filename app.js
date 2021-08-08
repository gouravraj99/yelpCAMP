var express = require("express"),
    bodyParser = require("body-parser"),
    mongoose = require("mongoose"),
    Campground = require("./models/campground.js"),
    Comment = require("./models/comment.js"),
    app = express(),
    SeedDB = require("./seed.js"),
    passport = require("passport"),
    LocalStrategy = require("passport-local"),
    User = require("./models/user.js");

mongoose.connect('mongodb://localhost:27017/yelp-ccamp');

//mongoose.connect("mongodb://gourav:EhjwXrhGe7B7yWvK@cluster0-shard-00-00-cooee.mongodb.net:27017,cluster0-shard-00-01-cooee.mongodb.net:27017,cluster0-shard-00-02-cooee.mongodb.net:27017/test?ssl=true&replicaSet=Cluster0-shard-0&authSource=admin&retryWrites=true&w=majority",{useNewUrlParser: true, useUnifiedTopology: true});
app.use(bodyParser.urlencoded({ extended: true }));
app.set("view engine", "ejs");

SeedDB();

//PASSPORT CONFIGURATION
app.use(require("express-session")({
    secret: "Megha is sweet girl",
    resave: false,
    saveUninitialized: false
}));

app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use(function(req, res, next) {
    res.locals.currentUser = req.user;
    next();
});

//SCHEMA SETUP



// campground.create(
//     {
//         name:"Nothern Lights", 
//         img_url:"https://images.pexels.com/photos/618848/pexels-photo-618848.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940",
//           description: "Nothern Lights is a wonder which should be seen once in a lifetime."

//     }, function(error,campground)
//     {
//         if(error)
//         console.log(error);
//         else
//         {
//             console.log("New created Campground: ");
//             console.log(campground);
//         }
//     }
// )

// IS LOGGED IN
function isLoggedIn(req, res, next) {
    if (req.isAuthenticated()) {
        return next();
    }
    res.redirect("/login");
}


//INDEX

app.get("/campgrounds", function(req, res) {
    //get all campgrounds
    console.log(req.user);
    Campground.find({}, function(error, allcampgrounds) {
        if (error) {
            console.log(error);
        } else {
            res.render("index.ejs", { allcampgrounds: allcampgrounds, currentUser: req.user });
        }
    })

});

// NEW

app.get("/campgrounds/new", function(req, res) {
    res.render("new.ejs");
});


//CREATE
app.post("/campgrounds", function(req, res) {
    var name = req.body.name;
    var url = req.body.url;
    var desc = req.body.description;

    var newCampground = { name: name, img_url: url, description: desc };
    Campground.create(newCampground, function(error, newlyCreated) {
        if (error)
            console.log("Error Occurred!");
        else
            res.redirect("/campgrounds");
    })


});
//ROUTE FOR ADDING NEW COMMENT
app.get("/campgrounds/:id/comment/new", isLoggedIn, function(req, res) {
    Campground.findById(req.params.id, function(error, found_camp) {
        if (error)
            console.log(error);
        else
            res.render("new_comment.ejs", { id: found_camp });

    });
})
app.post("/campgrounds/:id/comment", isLoggedIn, function(req, res) {
    Campground.findById(req.params.id, function(error, found_camp) {
        if (error)
            console.log(error);
        else {
            console.log(req.body.comment);
            Comment.create(req.body.comment, function(error, newly_created_comment) {
                if (error)
                    console.log(error);
                else {
                    found_camp.comment.push(newly_created_comment);
                    found_camp.save();
                    res.redirect("/campgrounds/" + found_camp._id);
                }
            });
        }

    });
});
//SHOW
app.get("/campgrounds/:id", function(req, res) {
    var rec = req.params.id;
    Campground.findById(rec).populate("comment").exec(function(error, foundCampground) {
        if (error)
            console.log(error);
        else
        // res.send(foundCampground);
            res.render("show.ejs", { camp: foundCampground })
    });

});

//Authentication related routes
app.get("/register", function(req, res) {
    res.render("register");
});

app.post("/register", function(req, res) {
    var newUser = new User({ username: req.body.username });
    User.register(newUser, req.body.password, function(error, user) {
        if (error) {
            console.log(error);
            res.redirect("/campgrounds");
        }

        passport.authenticate("local")(req, res, function() {
            res.redirect("/campgrounds");
        });
    });

});

//LOGIN
app.get("/login", function(req, res) {
    res.render("login");
})


app.post("/login", passport.authenticate("local", {
    successRedirect: "/campgrounds",
    failureRedirect: "/login"
}), function(req, res) {});




//LOGOUT

app.get("/logout", function(req, res) {
    req.logout();
    res.redirect("/campgrounds");
});
app.listen(3000, function() {
    console.log("Server is listening..");
});
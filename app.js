var express = require('express'),
    app = express(),
    bodyParser = require("body-parser"),
    mongoose = require("mongoose"),
    Product = require("./models/product"),
    Comment = require("./models/comment"),
    User = require("./models/user"),
    passport = require('passport'),
    LocalStrategy = require("passport-local"),
    methodOverride = require('method-override'),
    moment = require('moment'),
    flash = require('connect-flash');

var commentRoutes = require('./routes/comments'),
    productRoutes = require('./routes/products'),
    userRoutes = require('./routes/user'),
    indexRoutes = require('./routes/index');


try {
    mongoose.connect("mongodb+srv://kamlendra:" + process.env.mongodpass + "@cluster2-pz6wg.mongodb.net/test?retryWrites=true&w=majority", {
        useUnifiedTopology: true, useNewUrlParser: true
    });
} catch (error) {
    handleError(error);
}
process.on('unhandledRejection', error => {
    console.log('unhandledRejection', error.message);
});


app.use(bodyParser.urlencoded({
    extended: true
}));
app.set("view engine", "ejs");
app.use(express.static(__dirname + "/public"));
app.use(methodOverride("_method"));
app.use(flash());
//seedDB();

//////Passport configurations////////////////

app.use(require("express-session")({
    secret: "aur ye hai rahasya",
    resave: false,
    saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());
app.use(function (req, res, next) {
    res.locals.moment = moment;
    res.locals.currentUser = req.user;
    res.locals.error = req.flash("error");
    res.locals.success = req.flash("success");
    next();
});
app.use(userRoutes);
app.use(indexRoutes);
app.use(productRoutes);
app.use(commentRoutes);

////////////////moment//////////////////////////////


///==========================================listener==================================//
app.listen(process.env.PORT || 408, function () {
    console.log("the server has started");
});

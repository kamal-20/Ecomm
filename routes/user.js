var express = require("express"),
    router = express.Router(),
    passport = require('passport'),
    middleware = require('../middleware'),
    Product = require('../models/product'),
    Category = require("../models/categories"),
    User = require("../models/user");


router.post("/register", function (req, res) {
    var name = req.body.name.split(" ");
    if(name[1]==undefined){
        name[1]="";
    }
    var url = "";
    if (req.body.gender == "female") {
        url = "https://res.cloudinary.com/dsys26psh/image/upload/v1582347832/avatar-5_hm6cyq.jpg";
    }
    else {
        url = "https://res.cloudinary.com/dsys26psh/image/upload/v1582347824/avatar-1_anpifx.jpg";
    }
    var newUser = {
        firstname: name[0],
        lastname: name[1],
        username: req.body.username,
        email: req.body.email,
        gender: req.body.gender,
        profile_image: url,

    };
    console.log(newUser);
    User.register(newUser, req.body.password, function (err, user) {
        if (err) {
            console.log(err);
            req.flash("error",err.message);
            res.redirect("back");
        }
        passport.authenticate('local')(req, res, function () {
            req.flash("success", "Welcome to EComm  " + user.username);
            res.redirect("/profile/"+user._id);
        });
    });
});

router.post("/login", passport.authenticate("local", {
    successRedirect: "back",
    failureRedirect: "back"
}), function (req, res) {

});



router.get('/logout', function (req, res) {
    req.logout();
    req.flash("success", "Logged you out!");
    res.redirect("/");
});

router.get('/seller',middleware.isLoggedIn, function(req, res) {
    res.render("users/company");
    
});

router.post('/seller/:id',middleware.isLoggedIn, function (req, res) {
    var updateduser = req.user;
    updateduser.company = req.body.company;
    updateduser.is_seller = true;
    User.findByIdAndUpdate(req.params.id, updateduser, function(err, user) {
        if(err) {
            console.log(err);
            res.redirect("back");
        } else {
            res.redirect("/seller/" + user._id);
        }
    });
});


router.post("/:id/update", middleware.isLoggedIn, function (req, res) {
    User.findById(req.params.id, function (err, user) {
        if (err) {
            console.log(err);
            res.redirect("back");
        } else {
            user.name = req.body.name;
            user.phone = req.body.phone;
            user.address = req.body.address;
            user.save();
            res.redirect("back");
        }
    });
});


router.get("/profile/:id",middleware.isLoggedIn, function (req, res) {
    User.findById(req.user._id).populate("wishlist products").exec(function (err, foundUser) {
        console.log(foundUser);
        
        if (err) {
            req.flash("error", "some problem occured");
            res.redirect("back");
        } else {
            res.render("users/profile", { useri: foundUser});
        }
    });
});

router.get("/seller/:id",middleware.isLoggedIn, function (req, res) {
    Category.find({}, function (err, category) {
        if (err) {
            console.log(err);
        } else {
            res.render("users/seller", { category: category });
        }
    });
});

router.post("/wish/:id/ad",middleware.isLoggedIn, function(req,res) {
   Product.findById(req.params.id, function(err, foundproduct) {
       console.log(req.params.id,foundproduct);
       
      if (err) {
          console.log(err);
          req.flash("error", "some problem occured, Can't add product to wishlist");
          res.redirect("back")
          
      } else {
          User.findById(req.user._id, function (err, founduser) {
              if (err) {
                  console.log(err);
              } else {
                  founduser.wishlist.push(foundproduct);
                  founduser.save();
                  req.flash("success", "Product added to your Wishlist");
                  res.redirect("back");
              }
          });
      } 
   }); 
});

router.post("/wish/:id/rm", middleware.isLoggedIn, function (req, res) {
    Product.findById(req.params.id, function (err, foundproduct) {
        if (err) {
            console.log(err);
            req.flash("error", "some problem occured, Can't add product to wishlist");
            res.redirect("back")

        } else {
            console.log(foundproduct);
            req.user.wishlist.pop(foundproduct);
            req.user.save();
            req.flash("success", "Product removed from Wishlist");
            res.redirect("back");
        }
    });
});
router.get("/cart",middleware.isLoggedIn, function (req, res) {
    User.findById(req.user._id).populate("cart").exec(function (err, foundproducts) {
        if (err) {
            console.log(err);
        } else {
            res.render("users/cart", { cart: foundproducts.cart });
        }
    });    
});

module.exports = router;
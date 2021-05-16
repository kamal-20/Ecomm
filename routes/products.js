var express = require("express"),
    router = express.Router(),
    Product = require('../models/product'),
    Category = require("../models/categories"),
    Comment = require("../models/comment"),
    User = require("../models/user"),
    middleware = require('../middleware'),
    locus   = require('locus'),
    multer = require('multer');

var storage = multer.diskStorage({
    filename: function (req, file, callback) {
        callback(null, Date.now() + file.originalname);
    }
});
var imageFilter = function (req, file, cb) {
    // accept image files only
    if (!file.originalname.match(/\.(jpg|jpeg|png|gif)$/i)) {
        return cb(new Error('Only image files are allowed!'), false);
    }
    cb(null, true);
};
var upload = multer({ storage: storage, fileFilter: imageFilter });

var cloudinary = require('cloudinary');
cloudinary.config({
    cloud_name: 'dsys26psh',
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
});


router.post("/products",middleware.isLoggedIn, upload.single('image'), function (req, res) {
    cloudinary.uploader.upload(req.file.path, function (result) {
        req.body.product.image = result.secure_url;
        req.body.product.seller = {
            id: req.user._id,
            company: req.user.company
        };
        
        Category.findOne({title: req.body.product.sub_category }, function (err, category) {
        if (err) {
            console.log(err);
        }else {
            Product.create(req.body.product, function (err, product) {
                if (err) {
                    req.flash("error", "Something went wrong");
                    console.log(err);
                } else {
                    console.log(product);
                    category.products.push(product);
                    category.save();
                    req.user.products.push(product);
                    req.user.save();
                    req.flash("success", "Successfully added product");
                    res.redirect("/");
                }
            });
        }
    });

});

});

router.get("/products/:cat", function(req,res) {
    Category.findOne({ title: req.params.cat }).populate("products").exec(function (err, foundcategory) {
        if (err) {
            console.log(err);
        } else {
            res.render("products/products", { category: foundcategory });
        }
    });
});


router.get("/products/show/:id", function (req, res) {
    Product.findById(req.params.id).populate("comments").exec(function (err, productfound) {
        if (err) {
            console.log(err);
        } else {
            res.render("products/show", { product: productfound });
        }
    });

});


router.get("/products/:id/edit", middleware.checkUser, function (req, res) {
    Product.findById(req.params.id, function (err, foundproduct) {
        if (err) {
            console.log(err);
        } else {
            Category.find({},function(err, foundcategory) {
                if (err) {
                    console.log(err);
                    
                } else {
                    res.render("products/edit", { product: foundproduct, category: foundcategory });      
                }
            });
        }
    });
});

router.put("/products/:id", middleware.checkUser, function (req, res) {
    Product.findByIdAndUpdate(req.params.id, req.body.product, function (err, product) {
        if (err) {
            console.log(err);
            res.redirect("back");
        } else {
            req.flash("success", "Successfully edited product");
            res.redirect("back");
        }
    });
});


router.delete("/products/:id", function (req, res) {
    Product.findByIdAndRemove(req.params.id, function (err) {
        if (err) {
            res.redirect("back");
        } else { 
            req.flash("success", "Successfully deleted product");
            res.redirect("/");
        }
    });
});


router.post("/:id/cart", middleware.isLoggedIn, function (req, res) {
    Product.findById(req.params.id, function (err, productfound) {
        if (err) {
            console.log(err);
        } else {
            User.findById(req.user._id, function (err, founduser) {
                if (err) {
                    console.log(err);
                } else {
                    founduser.cart.push(productfound);
                    founduser.save();
                    res.redirect("back");
                }
            });
        }
    });
});

router.post("/:id/cartrm", middleware.isLoggedIn, function (req, res) {
    Product.findById(req.params.id, function (err, productfound) {
        if (err) {
            console.log(err);
        } else {
            User.findById(req.user._id, function (err, founduser) {
                if (err) {
                    console.log(err);
                } else {
                    founduser.cart.pop(productfound);
                    founduser.save();
                    res.redirect("back");
                }
            });
        }
    });
});

module.exports = router;

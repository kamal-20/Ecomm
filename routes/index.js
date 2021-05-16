var express = require("express"),
    router  = express.Router(),
    passport = require('passport'),
    Product = require('../models/product'),
    Category = require('../models/categories'),
    User = require("../models/user"),
    middleware = require('../middleware'),
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
var upload = multer({ storage: storage, fileFilter: imageFilter })

var cloudinary = require('cloudinary');
cloudinary.config({
    cloud_name: 'dsys26psh',
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
});

router.get("/", function (req, res) {
    Category.find({}, function (err, category) {
        if (err) {
            console.log(err);
        } else {
            res.render("products/index", {category:category});
        }
    });
});

router.get("/category", function(req,res) {
    res.render("products/category");
});


router.post("/category", upload.single('image'), function (req, res) {
        cloudinary.uploader.upload(req.file.path, function (result) {
            req.body.category.image = result.secure_url;
            Category.create(req.body.category, function (err, category) {
                if (err) {
                    req.flash('error', err.message);
                    return res.redirect('back');
                }
                res.redirect('back');
            });
        });
});

router.get("/devs",function(req,res) {
   res.render("developers/developer"); 
});

module.exports  = router;
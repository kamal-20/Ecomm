var   Product = require('../models/product'),
      Comment = require('../models/comment');

var middlewareObj = {};

middlewareObj.checkUser  = function(req,res, next) {
    if(req.isAuthenticated()){
        Product.findById(req.params.id, function(err,foundproduct) {
            if (err) {
                req.flash("error","Product not found");
                res.redirect("back");
            } else {
                if (foundproduct.seller.id.equals(req.user._id)) {
                next();
                } else {
                    req.flash("error","You don't have permission to do that");
                    res.redirect("back");
                }
            }
        });
    } else {
        req.flash("error","You need to be signed in to do that");
        res.redirect("back");
    }
};

middlewareObj.checkCommentOwnership = function(req,res,next) {
    if(req.isAuthenticated()){
        Comment.findById(req.params.c_id, function(err,foundcomment) {
            if (err) {
                res.redirect("back");
            } else {
                if (foundcomment.author.id.equals(req.user._id)) {
                next();
                } else {
                    req.flash("error","You don't have permission to do that");
                    res.redirect("back");
                }
            }
        });
    } else {
        req.flash("error","You need to be signed in to do that");
        res.redirect("back");
    }
};

middlewareObj.isLoggedIn = function(req,res,next) {
    if (req.isAuthenticated()) {
        return next();
    }
    req.flash("error","You need to be signed in to do that");
    res.redirect("back");
};

module.exports = middlewareObj;

var express = require("express"),
    router = express.Router(),
    Product = require('../models/product'),
    middleware = require('../middleware'),
    Comment = require("../models/comment");

router.post("/:id/comments", middleware.isLoggedIn, function (req, res) {
    Product.findById(req.params.id, function (err, product) {
        if (err) {
            console.log(err);
            res.redirect("back");
        } else {
            Comment.create(req.body.comment, function (err, comment) {
                if (err) {
                    req.flash("error", "Something went wrong");
                    console.log(err);
                } else {
                    comment.author.id = req.user._id;
                    comment.author.fullname = req.user.firstname+ " " + req.user.lastname;
                    comment.author.profile_image = req.user.profile_image;
                    comment.save();
                    console.log(comment);
                    product.comments.push(comment);
                    product.save();
                    req.flash("success", "Successfully added comment");
                    res.redirect('back');
                }
            });
        }
    });
});

// edit route

// destroy routes
router.delete("/:id/comments/:c_id", middleware.checkCommentOwnership, function (req, res) {
    Comment.findByIdAndRemove(req.params.c_id, function (err) {
        if (err) {
            res.redirect("back");
        } else {
            req.flash("success", "Comment deleted!!!");
            res.redirect("back");
        }
    })
});


module.exports = router;
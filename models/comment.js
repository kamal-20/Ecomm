var mongoose = require('mongoose'),
    passportLocalMongoose = require('passport-local-mongoose');

var commentSchema = new mongoose.Schema({
    text: String,
    image: Array,
    createdAt:{type: Date, default: Date.now},
    author: {
        id:{
            type: mongoose.Schema.Types.ObjectId,
            ref: "User"
        },
        username: String,
        profile_image:String,
        fullname: String

    }
});

module.exports = mongoose.model("Comment", commentSchema);
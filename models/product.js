var mongoose                = require('mongoose'),
    passportLocalMongoose   = require('passport-local-mongoose');


var productSchema = new mongoose.Schema({
    title: String,
    stitle: String,
    description: String,
    image: String,
    price: Number,
    category:String,
    brand: String,
    seller:{
        id:{
            type: mongoose.Schema.Types.ObjectId,
            ref: "User"
        },
        company: String
    },
    comments:[
        {type: mongoose.Schema.Types.ObjectId,
        ref: "Comment"
        }
    ],
    sub_category: String
});

module.exports = mongoose.model("Product", productSchema);
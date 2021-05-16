var mongoose                = require('mongoose'),
    passportLocalMongoose   = require('passport-local-mongoose');

var userSchema = new mongoose.Schema({
    firstname: String,
    lastname: String,
    username: String,
    is_admin: { type: Boolean, default: false },
    is_seller: {type: Boolean, default: false},
    profile_image: String,
    email: String,
    phone: Number,
    company: String,
    gender: String,
    address: {
        street: String,
        city: String,
        state: String,
        pin: Number
    },
    products: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Product"
        }
    ],
    cart: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Product"
        }
    ],
    wishlist: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Product"
        }
    ]
});

userSchema.plugin(passportLocalMongoose);

module.exports = mongoose.model("User",userSchema);
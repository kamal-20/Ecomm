var mongoose = require('mongoose'),
    passportLocalMongoose = require('passport-local-mongoose');

var categorySchema = new mongoose.Schema({
    main_category: String,
    title: String,
    image: String,
    products: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Product"
        }
    ]
});

module.exports = mongoose.model("Category", categorySchema);
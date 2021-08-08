var mongoose=require("mongoose");
var campgroundSchema =new mongoose.Schema({
    name : String,
    img_url: String,
    comment: [{

        type: mongoose.Schema.Types.ObjectId,
        ref: "comment"
    }],
    description: String
});


module.exports = mongoose.model("campground",campgroundSchema);
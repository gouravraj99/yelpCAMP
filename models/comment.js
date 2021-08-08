var mongoose= require("mongoose");

var commentSchema={
    text: String,
    author: String
}
module.exports= mongoose.model("comment",commentSchema);
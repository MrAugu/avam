const mongoose = require("mongoose");

const upvoteSchema = mongoose.Schema({
    userID: String,
    upvoted: String,
    upvotedAt: String
});

module.exports = mongoose.model("Upvotes", upvoteSchema);

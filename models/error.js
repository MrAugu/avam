const mongoose = require("mongoose");

const errorSchema = mongoose.Schema({
    errorID: String,
    error: String,
    command: String,
    timestamp: String
});

module.exports = mongoose.model("Error", errorSchema);
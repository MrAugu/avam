const mongoose = require("mongoose");

const levelSchema = mongoose.Schema({
    userID: String,
    serverID: String,
    xp: Number,
    level: Number
});

module.exports = mongoose.model("Levels", levelSchema);
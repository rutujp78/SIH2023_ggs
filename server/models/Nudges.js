const mongoose = require('mongoose');

const Schema = new mongoose.Schema({
    userId: { type: String },
    name: { type: String },
    description: { type: String },
    city: { type: String },
    state: { type: String },
    data: { type: String },
    category: { type: String },
    data: { type: Array } // here need to add userId field
})

// data: { type: [{ key: String, value: String }]} MAYBE

module.exports = mongoose.model("NUDGES", Schema);
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const locationSchema = new Schema({
    id: String,
    longitude: Number,
    lattitude: Number,
    name: String,
    description: String,

});

module.exports = mongoose.model('location', locationSchema);
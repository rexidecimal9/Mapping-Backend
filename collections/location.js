const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const locationSchema = new Schema({
    id: String,
    longitude: Number,
    latitude: Number,
    name: String,
    description: String,
    address: String,
    customers: [String]

});

module.exports = mongoose.model('location', locationSchema);
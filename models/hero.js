/*
* Create a hero schema for the mongoose database.
*/

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const wordSchema = new Schema({
    name: String,
    category: String,
    part: String,
});

//Exports the word model.
module.exports = mongoose.model('Word', wordSchema);
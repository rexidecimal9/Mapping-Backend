

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const wordSchema = new Schema({
    name: String,
    category: String,
    part: String,
});


// Mongoose Models are collection specific, the first parameter 'Word' in this case refers to the word collection
// and passes the schema as the object you need to refer too whenever dealing with this collection
module.exports = mongoose.model('Word', wordSchema);
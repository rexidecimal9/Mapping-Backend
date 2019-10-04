/*
* Setting up the server for the backend.
*/
import express from 'express';
import jwt from 'express-jwt';
import cors from 'cors';
import jwks from 'jwks-rsa';
import bodyParser from 'body-parser';
const graphqlHTTP = require('express-graphql');
const schema = require('./schema/schema');
const mongoose = require('mongoose');
var path = require('path');

// initialize the db variable as our database, MongoDB does not need to be opened and closed
// this will not affect performance
// var db = monk('localhost:27017/mappingDB');
// IkPXp46PhTcxGko3
mongoose.connect('mongodb+srv://SIAdmin:IkPXp46PhTcxGko3@mappingtestcluster-mnocj.gcp.mongodb.net/test', {useNewUrlParser: true});
mongoose.connection.once('open', () => {
    console.log('Connected to database')
});
// The app object is instantiated on creation of the Express server.
const app = express();
// Creates permission to let the localhost:4200 have access to the resources of the server.
app.options('http://localhost:4200', cors());
app.use(bodyParser.json);
app.use(bodyParser.urlencoded({extended: true}));
// Uses mongoose as the intermediary between GraphQL and MongoDb.
// Creating a connection the the MongoDB using the URL.
// The "{useNewUrlParser: true}" parameter is included because the current url string parser is depreciated,
// the server will still run without this, but that message will display everytime you do "node app.js".
// mongoose.connect('mongodb://tester:A1B2C3D4@ds255364.mlab.com:55364/gql-ninja', {useNewUrlParser: true});
// mongoose.connection.once('open', () => {
//     console.log('connected to database');
// })

// Adds the middleware layer to the Express middleware stack.
app.use('/graphql',cors(), graphqlHTTP({
    schema,
    graphiql: true
}));

// Creates an HTTP server and returns the instance.
app.listen(3000, () => {
    console.log('now listening to requests on port 3000')
});
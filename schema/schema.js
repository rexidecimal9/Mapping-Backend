/*
* Defines the Queries and Mutations to be used by GraphQL against our database.
*/

const graphql = require('graphql');
const Word = require('../collections/words');
const Test = require('../collections/test');
const Location = require('../collections/location');
const Types = require('../Types/Types');
const IO = require('../Types/IOTypes');
const express = require('express');
const sanitize = require('mongo-sanitize');
// const router = express.Router();
// var monk = require('monk');
// const db = monk('localhost:27017/test');
const uuid = require('uuid/v4');


// Initalize all Graphql types
const{
     GraphQLObjectType,
     GraphQLString,
     GraphQLSchema,
     GraphQLList,
     GraphQLNonNull,
     GraphQLID,
     GraphQLFloat,
     GraphQLBoolean
} = graphql;

//Defines the types of the hero 



// Creating the queries for GraphQL.
const RootQuery = new GraphQLObjectType({
    name:'RootQueryType',
    fields:{
        // Returns a List of all words in a particular category
        words: {
            // Defines the type of query.
            type: Types.WordType,
            // Defines the argument of the query.
            args: {
                category: {type: GraphQLString},
            },
            // Defines the functionality of the query.
            resolve(parent, args){
                // Finds the words that fall into the category specified
                return Word.find( { category: args.category } );
            }
        },

        // Returns an array of all the words
        allWords: {
            type: new GraphQLList(Types.WordType),
            resolve(parent, args){
                return Word.find();
            }
        },

        //Returns user from test DB
        test: {
            type: new GraphQLList(Types.TestType),
            resolve(parent, args){
                return Test.find();
                // const collection = db.get('usercollection');
                // return collection.find();
            }
        },

        locations: {
            type: new GraphQLList(Types.LoactionType),
            resolve(parent, args){
                return Location.find();
            }
        }
    }
});

// Creating the mutations for GraphQL
const Mutation = new GraphQLObjectType({
    name: 'Mutation',
    fields: {
        // Adds a word to the database.
        addWord:{
            type: Types.WordType,
            args:{
                name: {type: new GraphQLNonNull(GraphQLString)},
                category: {type: GraphQLString},
                part: {type: GraphQLString},
            },
            resolve(parent, args){
                let word = new Word({
                    name: args.name,
                    category: args.category,
                    part: args.part,
                });
                return word.save();
            }
        },
        // Deletes a word from the database.
        deleteWord:{
            type: Types.WordType,
            args:{
                id: {type: GraphQLString},
            },
            //Async - creates a promise that is sent and allows the code to continue executing normally (may take a long time if you have to wait for it)
            async resolve(parent, args){
                await Word.findById(args.id).remove().exec();
            }
        },
        // Updates a Word
        updateWord:{
            type: Types.WordType,
            args:{
                id: {type: new GraphQLNonNull(GraphQLString)},
                name: {type: GraphQLString},
                category: {type: GraphQLString},
            },
            async resolve(parents, args){
                let word = await Word.findById(args.id);
                word.name = args.name;
                word.category = args.category;
                return word.save();
            }
        },
        addTest:{
            type: Types.TestType,
            args:{
                username: {type: new GraphQLNonNull(GraphQLString)},
                email: {type: new GraphQLNonNull(GraphQLString)}
            },
            resolve(parent, args){
                let test = new Test({
                    id: uuid(),
                    username: args.username,
                    email: args.email,
                });
                return test.save();
                // const collection = db.get('usercollection');
                // collection.insert(data);
                // return collection.findOne({"id": data.id});
            }
        },
        addLocation: {
            type: Types.LoactionType,
            args: {
                input: {type: IO.addLocation}
                },
            resolve(parent, args){
                let location = new Location({
                    id: uuid(),
                    latitude: sanitize(args.input.latitude),
                    longitude: sanitize(args.input.longitude),
                    name: sanitize(args.input.name),
                    description: sanitize(args.input.description),
                    address: sanitize(args.input.address),
                    customers: sanitize(args.input.customers)
                });
                return location.save();
            }
        },

        deleteLocation: {
            type: GraphQLBoolean,
            args:{
            },
            async resolve(parent, args){
                
            }   
        }
    }
});

// Exporting the Queries and Mutations
module.exports = new GraphQLSchema({
    query: RootQuery,
    mutation: Mutation
});
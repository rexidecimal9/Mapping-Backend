/*
* Defines the Queries and Mutations to be used by GraphQL against our database.
*/

const graphql = require('graphql');
const Word = require('../models/words');
const Test = require('../models/test');
const express = require('express');
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
     GraphQLID
} = graphql;

//Defines the types of the hero 
const TestType = new GraphQLObjectType({
    name: 'test',
    fields: () => ({
        id: {type: GraphQLString},
        username: {type: GraphQLString},
        email: {type: GraphQLString},
    })
});

const WordType = new GraphQLObjectType({
    name: 'word',
    fields: () => ({
        name: {type: GraphQLString},
        category: {type: GraphQLString},
        part: {type: GraphQLString},
    })
});

// Creating the queries for GraphQL.
const RootQuery = new GraphQLObjectType({
    name:'RootQueryType',
    fields:{
        // Returns a List of all words in a particular category
        words: {
            // Defines the type of query.
            type: WordType,
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
            type: new GraphQLList(WordType),
            resolve(parent, args){
                return Word.find();
            }
        },

        //Returns user from test DB
        test: {
            type: new GraphQLList(TestType),
            resolve(parent, args){
                return Test.find();
                // const collection = db.get('usercollection');
                // return collection.find();
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
            type: WordType,
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
            type: WordType,
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
            type: WordType,
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
            type: TestType,
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
    }
});

// Exporting the Queries and Mutations
module.exports = new GraphQLSchema({
    query: RootQuery,
    mutation: Mutation
});
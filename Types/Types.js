const graphql = require('graphql');

const{
    GraphQLObjectType,
    GraphQLString,
    GraphQLSchema,
    GraphQLList,
    GraphQLNonNull,
    GraphQLID,
    GraphQLFloat,
} = graphql;


exports.Location = {
    
}

exports.TestType =  new GraphQLObjectType({
    name: 'test',
    fields: () => ({
        id: {type: GraphQLString},
        username: {type: GraphQLString},
        email: {type: GraphQLString},
    })
});

exports.WordType = new GraphQLObjectType({
    name: 'word',
    fields: () => ({
        name: {type: GraphQLString},
        category: {type: GraphQLString},
        part: {type: GraphQLString},
    })
});

exports.LoactionType = new GraphQLObjectType({
    name: 'location',
    fields: () => ({
        id: {type: GraphQLString},
        longitude: {type: GraphQLFloat},
        lattitude: {type: GraphQLFloat},
        name: {type: GraphQLString},
        description: {type: GraphQLString},
    })
});
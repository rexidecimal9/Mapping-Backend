const graphql = require('graphql');

const{
    GraphQLObjectType,
    GraphQLString,
    GraphQLSchema,
    GraphQLList,
    GraphQLNonNull,
    GraphQLID,
    GraphQLFloat,
    GraphQLInputObjectType,
} = graphql;

exports.addLocation = new GraphQLInputObjectType({
    name: 'addLocation',
    fields: () => ({
        longitude: {type: GraphQLFloat},
        latitude: {type: GraphQLFloat},
        name: {type: GraphQLString},
        description: {type: GraphQLString},
        customers: {type: new GraphQLList(GraphQLString)},
        address: {type: GraphQLString}
    })
});
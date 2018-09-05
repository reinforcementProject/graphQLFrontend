const graphql = require('graphql');
const Movie = require('../model/movieModel');

const {
  GraphQLObjectType, GraphQLString, GraphQLSchema, GraphQLInt, GraphQLList,
} = graphql;

const MovieType = new GraphQLObjectType({
  name: 'Movie',
  fields: () => ({
    name: { type: GraphQLString },
    year: { type: GraphQLInt },
    overview: { type: GraphQLString },
    rating: { type: GraphQLInt },
  }),
});

const RootQuery = new GraphQLObjectType({
  name: 'RootQueryType',
  fields: {
    movies: {
      type: new GraphQLList(MovieType),
      args: { 
              year: { type: GraphQLInt },
              name: { type: GraphQLString }
            },
      resolve(parents, args) {
        if(args.year){
          return Movie.find({year: args.year})
        } else if (args.name){
          return Movie.find({name: args.name})
        } else {
          return Movie.find({})
        }
      },
    },
  },
});

const Mutation = new GraphQLObjectType({
  name: 'Mutation',
  fields: {
    addMovie: {
      type: MovieType,
      args: {
        name: { type: GraphQLString },
        year: { type: GraphQLInt },
        overview: { type: GraphQLString },
        rating: { type: GraphQLInt },
      },
      resolve(parents, args) {
        const movie = new Movie({
          name: args.name,
          year: args.year,
          overview: args.overview,
          rating: args.rating
        });
        return movie.save();
      },
    },
  },
});

module.exports = new GraphQLSchema({
  query: RootQuery,
  mutation: Mutation,
});
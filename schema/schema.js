const {
  GraphQLSchema,
  GraphQLObjectType,
  GraphQLString,
  GraphQLInt,
  GraphQLList,
  GraphQLFloat
} = require('graphql');
const Movie = require('../model/movieModel');
const fetch = require('node-fetch');

const baseURL =
  'https://api.themoviedb.org/3/discover/movie?api_key=5d576382955ff5829fc3844390db4427';

// this function builds the URL based on user's selection
function buildURL(baseURL, input) {
  if (input.year) {
    let yearurl = baseURL + '&primary_release_year=' + input.year;
    return yearurl;
  } else {
    let nameurl =
      'https://api.themoviedb.org/3/search/movie?api_key=5d576382955ff5829fc3844390db4427&language=en-US&query=' +
      input.name;
    return nameurl;
  }
}

const MovieType = new GraphQLObjectType({
  name: 'Movie',
  fields: () => ({
    name: { type: GraphQLString },
    year: { type: GraphQLInt },
    rating: { type: GraphQLFloat },
    poster: { type: GraphQLString }
  })
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
        console.log(args);
        const data = fetch(buildURL(baseURL, args))
          .then(response => {
            if (!response.ok) {
              throw error(response.statusText);
            }
            return response.json();
          })
          .then(response =>
            response.results.map(movie => {
              let newMovie = {
                name: movie.title,
                year: Number(movie.release_date.substring(0, 4)),
                rating: movie.vote_average,
                poster: movie.poster_path
              };
              return newMovie;
            })
          );
        return data;
      }
    }
  }
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
        rating: { type: GraphQLInt }
      },
      resolve(parents, args) {
        const movie = new Movie({
          name: args.name,
          year: args.year,
          overview: args.overview,
          rating: args.rating
        });
        return movie.save();
      }
    }
  }
});

module.exports = new GraphQLSchema({
  query: RootQuery,
  mutation: Mutation
});

const express = require('express');
const graphqlHTTP = require('express-graphql');
const mongoose = require('mongoose');

const app = express();
const schema = require('./schema/schema.js');

mongoose.connect('mongodb://teamSMS111:teamsms111@ds245082.mlab.com:45082/moviesapi');
mongoose.connection.once('open', () => {
  console.log('connected to database');
});

app.use(
  '/graphql',
  graphqlHTTP(() => ({
    schema,
    graphiql: true,
  })),
);

app.listen(4000, () => {
  console.log('listening on port 4000');
});
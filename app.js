const express = require('express');
const graphqlHTTP = require('express-graphql');
const mongoose = require('mongoose');
const path = require('path');
const app = express();
const schema = require('./schema/schema.js');

mongoose.connect('mongodb://teamSMS111:teamsms111@ds245082.mlab.com:45082/moviesapi');
mongoose.connection.once('open', () => {
  console.log('connected to database');
});

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
		res.set('content-type', 'application/json');
	next();
});

app.use(
  '/graphql',
  graphqlHTTP(() => ({
    schema,
    graphiql: true,
  })),
);


app.use('/',(req,res,next)=>{
	console.log(path.join(__dirname,'./build/index.html'));
	console.log('REQ URL',req.url)
	if(req.url === '/webpack-bundle.js'){
		 // console.log('setting the header type');
		 res.set('content-type', 'application/javascript');
		 res.redirect('/bundle');
	 }else if(req.url == '/'){
		 console.log('textHTML')
		 res.set('content-type', 'text/html	');
		 // res.redirect('/');
	 }
	 next();

})
app.get('/', (req,res,next)=> {
	console.log('homme ');
	res.sendFile(path.join(__dirname,'./build/index.html'))
})
app.get('/bundle', (req,res, next)=>{
	console.log('bundd;ee')
	res.sendFile(path.join(__dirname,'./build/webpack-bundle.js'));
})


app.listen(4000, () => {
  console.log('listening on port 4000');
});

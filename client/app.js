import React from 'react';
import ReactDOM from 'react-dom';
import {  graphql } from 'react-apollo';
import gql from 'graphql-tag';

const currentMoviesList = gql`
query movies {
	movies {
		name
		id
	}
}
`

//// {data.movies.map(movie =>{
// 	return <h3>{movie.name}</h3>
// })}
class App extends React.Component{
	render(){

		const {data} = this.props;
		const {loading, movies, error} = data;
	 console.log(`loading ${loading} movies ${movies} error $error`);
		return data.loading ? <h1> Loding... </h1>
		: <div>
			Hello World
			
			{console.log('moviess',movies)}
			{console.log(Array.isArray(movies))}
			{movies.map(el=><h3> {el.name}</h3>)}

		</div>

	}
}

const AppWithData = graphql(currentMoviesList)(App)
export default AppWithData;

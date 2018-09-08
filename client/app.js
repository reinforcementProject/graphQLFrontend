import React from 'react';
import ReactDOM from 'react-dom';
import {  graphql } from 'react-apollo';
import gql from 'graphql-tag';
import SearchBar from './searchBar.js';
import { ApolloConsumer } from 'react-apollo';
import ShowData from './showData.js';
const searchByName = gql`
query searchByName($name:String!) {
	movies(name:$name) {
		name

	}
}
`
const searchByYear = gql`
query searchByYear($year:String!) {
	movies(year:$year) {
		name

	}
}
`
//// {data.movies.map(movie =>{
// 	return <h3>{movie.name}</h3>
// })}

const buttonStyle={
	fontFamily: 'Arial',
    fontSize:' 0.8rem',
    height: '2rem',
    backgroundColor: '#57b5ff',
    border: 'none',
    borderRadius: '4px',
    color: 'white',
    width: '18%',
    boxShadow: '1px 1px 10px 1px #00000024',
    cursor: 'pointer',
		backgroundColor:"#57b5ff"
}
class AppWithData extends React.Component{
	constructor(props){
		super();
		this.state = {
			fieldName:'name',
			fieldValue:''
		};
		this.handleChange = this.handleChange.bind(this);

	}

	handleChange = (e) =>{
		console.log('E ', e.target.value, e.target.id);
		this.setState({[e.target.id]:e.target.value},()=>console.log('STATEE UPDATEEED ', this.state))
	}
	onMoviesFetched = (data) =>{
		console.log('onMoviesFetcheddd');
		console.log(data);
	}

	render(){
		return <div>
				<SearchBar handleChange={this.handleChange}
				 fieldName={this.state.fieldName} fieldValue={this.state.fieldValue}/>
				 <div style={{
					 display: "flex",
    	 		 justifyContent: "center",
    	 		margin: "10px"
				 }}>
				 <ApolloConsumer>
		 		{client => (<button onClick={()=>{
					console.log('client',client)

					console.log('CURRENT STATE', this.state);
					let variablesObj = { "name": this.state.fieldValue};
					let queryObj = {
											 query:  gql`
						 					query searchByName($name:String!) {
						 						movies(name:$name) {
						 							name
													year
													poster
													rating
						 						}
						 					}
						 					`,
											variables:variablesObj
										 };
					console.log('queryObj '.toUpperCase(), queryObj)
				 client.query(queryObj)
				 .then(data=>{
					 console.log("DATAAA ", data);
					 this.setState({"data":data.data.movies})
				 } )
				 .catch(err=>console.log('ERRORRR	', err))
				}}
				style={buttonStyle}
				>Submit </button>
			)}</ApolloConsumer>
			</div>
			 {console.log(this.state.data)}
				{this.state.data && <ShowData data={this.state.data} />}
			</div>


	}
}

// const AppWithData = graphql(currentMoviesList)(App)
export default AppWithData;

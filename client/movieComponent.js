import React from 'react';
import axios from 'axios';

const styleObj ={
	padding:'0',
	margin:"0",
	flex:" 1 0 auto",
	textAlign:"center",
	maxWidth: "100px"
}
export default class MovieComponent extends React.Component{
	constructor(props){
		super(props);
		this.state={}
	}
	getPhoto(){
		// axios.get('https://image.tmdb.org/t/p/w500' + this.props.data.poster)
		// .then(data => this.setState({'photo':data}))
	}
	componentDidMount(){
		console.log(this.props.data);

	}


	render(){
		console.log(this.props);

		return <div style={{margin: "5px"}}>
			{this.props.data && <img
				style={Object.assign({}, styleObj, {width:"100px", height:"140px"})}
				src={"https://image.tmdb.org/t/p/w500" + this.props.data.poster}/> }
			<h6 style={styleObj}> {this.props.data.name} </h6>
			<h6 style={styleObj}> {this.props.data.year} </h6>
			<h6 style={styleObj}> {this.props.data.rating} </h6>
		</div>
	}
}

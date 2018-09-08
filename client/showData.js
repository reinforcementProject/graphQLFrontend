import React from 'react';
import MovieComponent from './movieComponent';

export default class ShowData extends React.Component{


	render(){
		console.log(`this.props `, this.props);
		return <div style={{display:"flex",flexFlow: "row wrap"}}>
		  { this.props.data.map(movie => <MovieComponent data={movie} />)
				}
		</div>
	}
}

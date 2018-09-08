import React from 'react';

const SearchBar = (props  ) =>{
	console.log(props);
	const {handleChange, fieldName, fieldValue} = props;
	console.log(handleChange)
	return <div style={{display: "flex",justifyContent: "center"}}>
	<input
	style={{    border: "none",
    borderBottom: "solid #57b5ff",
    textAlign: "center",
	 fontFamily:"Arial",
 	 fontSize:"1rem"}}
	id='fieldValue'
	value={fieldValue}
	onChange={(e)=>handleChange(e)} />
	</div>
}

export default SearchBar

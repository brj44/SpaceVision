import './SearchBar.css'
import React from 'react'
const SearchBar = ({setPage}) =>{

    const buttonClick = () =>{
        setPage("Search Page");
    }

    return(
        <div>
        <label htmlFor="header-search">
           <span className="Search-Bar">Enter Query</span> 
        </label>
        <input className='Search-Input-Box'
            type="text"
            id="header-search"
        
            placeholder="Search NASA API "
            name="UserSearch" 
        />
        <button onClick={() => {buttonClick()}} className='Search-Button' >Search</button>
        </div>
    )
    
}
    

export default SearchBar;

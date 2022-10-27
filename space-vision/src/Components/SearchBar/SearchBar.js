import './SearchBar.css'
import React from 'react'
import  { useState, useEffect } from 'react';
const SearchBar = ({setPage,setQuery}) =>{
    
    const [input, setInput] = useState("")
    

    const buttonClick = () =>{
        setQuery(input)
        setPage("Search Page")
    }
    const getInput =(event)=>{
        setInput(event.target.value)
        console.log(input)

    }

    return(
        <div>
        <label htmlFor="header-search">
           <span className="Search-Bar">Enter Query</span> 
        </label>
        <input className='Search-Input-Box'
            type="text" onChange={getInput}
            id="header-search"
        
            placeholder="Search NASA API "
            name="UserSearch" 
        />
        <button onClick={() => {buttonClick()}} className='Search-Button' >Search</button>
        </div>
    )
    
}
    

export default SearchBar;

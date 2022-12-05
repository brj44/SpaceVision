import './SearchBar.css'
import React from 'react'
import  { useState, useEffect } from 'react';
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
const SearchBar = ({setPage,setQuery}) =>{

    const [input, setInput] = useState("")


    const buttonClick = () =>{
        if (input !== ""){
            setQuery(input)
            setPage("Search Page")
        }
    }
    const getInput =(event)=>{
        setInput(event.target.value)
        console.log(input)

    }

    return(
        <div
            style={{
                maxWidth: "100%",
            }}>
            <Box
                display= "flex"
                sx={{
                    gap: 2,
                }}
            >
            <label htmlFor="header-search">
                <span className="Search-Bar">Enter Query</span>
            </label>
            <input data-testid = "inputBar" className='Search-Input-Box'
                type="text" onChange={getInput}
                id="header-search"
                placeholder="Search NASA API "
                name="UserSearch"
            />
            <Button
                onClick={buttonClick}
                variant="contained"
                style={{
                    position: "relative",
                    top: "15%",
                    textTransform: "none",
                    padding: "14px 0px",
                    maxWidth: "30%",
                    maxHeight: "60%",
                    justifyContent: "center",
                }}
            >
                Search
            </Button>
            </Box>
        </div>
    )

}


export default SearchBar;

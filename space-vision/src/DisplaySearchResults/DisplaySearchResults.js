import './DisplaySearchResults.css'
import React, { useState, useEffect } from 'react';
//import video from "./video.mp4"

const TOP_RESULTS = 5
let APIKey = process.env.REACT_APP_API_KEY;

function SearchResults(){
     
    const [apiResults, setResults] = useState([])
    useEffect( () => {
        getData()
     }, [])
    console.log(apiResults)
 
const getData = () => {
    
    fetch("https://images-api.nasa.gov/search?q=apollo%2011")
       .then( res => res.json())
       .then((result) => {setResults(result.collection.items)})
       .then((result) => {console.log("in get data" ,result)})
    }

const displayResults=()=>{
    let results = []
    let count = 0;
    if(apiResults.length != 0){
        for(var i = 0; i < apiResults.length; i++){
             //results.push(<header className="header-info">{apiResults[i].title}</header>)
             if(apiResults[i].data[0].media_type == "image"){
                    results.push(<header className="header-info">{count + 1}).  {apiResults[i].data[0].title}</header>)
                    results.push(<img
                    alt = {apiResults[i].data[0].title}
                    width = '1200px'
                    height= '660px'
                    src = {apiResults[i].links[0].href}
                />)

                results.push(<p className="search-info">{apiResults[i].data[0].description}</p>)
                
            console.log("RESULTS --------- ", results)
            count++;
             }
             if(count == 10){
                break;
             }
        }
    }
    return results
}
    return(
        <div>
        <header className= "top10"> TOP 10 RESULTS</header>
            {displayResults()}
        </div>
    )
}

export default SearchResults;
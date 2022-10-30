import './DisplaySearchResults.css'
import React, { useState, useEffect } from 'react';
//import video from "./video.mp4"
//let APIKey = process.env.REACT_APP_API_KEY;



function SearchResults(props){
    
    const [apiResults, setResults] = useState([])
    let userQuery = props.searchKey

    useEffect( () => {
        getData()
        // eslint-disable-next-line react-hooks/exhaustive-deps
     }, [])
    console.log(apiResults)
 
const getData = () => {
    
    fetch("https://images-api.nasa.gov/search?q=" + userQuery)
       .then( res => res.json())
       .then((result) => {setResults(result.collection.items)})
       .then((result) => {console.log("in get data" ,result)})
    }

    async function sortResults(){
        apiResults.sort(function(a,b){
            //return adata[0].date_created - bdata[0].date_created;
            if(a.data[0].date_created === b.data[0].date_created)
                return 0;
            if(a.data[0].date_created < b.data[0].date_created)
                return 1;
            if(a.data[0].date_created > b.data[0].date_created)
                return -1;
            else return -1;
        });
    }

const displayResults=()=>{
    let results = []
    let count = 0;
    sortResults();
    if(apiResults.length !== 0){
        for(var i = 0; i < apiResults.length; i++){
             //results.push(<header className="header-info">{apiResults[i].title}</header>)
             if(apiResults[i].data[0].media_type === "image"){
                    results.push(<header className="header-info">{count + 1}).  {apiResults[i].data[0].title}</header>)
                    results.push(<img
                    alt = {apiResults[i].data[0].title}
                    width = '700x'
                    height= '700px'
                    src = {apiResults[i].links[0].href}
                />)

                results.push(<p className="search-info">{apiResults[i].data[0].description}</p>)
                results.push(<p className="search-date">{apiResults[i].data[0].date_created}</p>)
                
            console.log("RESULTS --------- ", results)
            count++;
             }
             if(count === 10){
                break;
             }
        }
    }
    else {
        results.push(<header className="header-error">Try to search again. No results Found</header>)
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


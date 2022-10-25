import './DisplaySearchResults.css'
function SearchResults(){
let dummy_search_result = [
{title: "Today in Space",
 DOA: "Two very different payloads flying on one rocket are ready for their ride to space. Creating an integrated stack that stands approximately 27 feet tall, the National Oceanic and Atmospheric Administration’s (NOAA) Joint Polar Satellite System-2 (JPSS-2) and NASA’s Low-Earth Orbit Flight Test of an Inflatable Decelerator (LOFTID) spacecraft are safely secured inside the United Launch Alliance (ULA) Atlas V rocket’s payload fairing at Vandenberg Space Force Base in California."

},
{
    title: "Tomorrow in space...",
    DOA: "9/29/22"
}]
const displayResults=()=>{
    let results = []
        for(var i = 0; i < dummy_search_result.length; i++){
            results.push(<header className="header-info">{dummy_search_result[i].title}</header>)
            results.push(<p className="search-info">{dummy_search_result[i].DOA}</p>)
        }
        return results
}
    return(
        <div>
            {displayResults()}
        </div>
    )
}

export default SearchResults;
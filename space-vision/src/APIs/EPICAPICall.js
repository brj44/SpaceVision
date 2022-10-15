async function EPICAPICall(){
    let APIKey = process.env.REACT_APP_API_KEY;
    let response = await fetch('https://api.nasa.gov/EPIC/api/natural?api_key=' + APIKey);
    const EPICAPIData = await response.json();
    return EPICAPIData;
}

export default EPICAPICall;

require('dotenv').config();
async function EPICAPICall(){
    let APIKey = process.env.APIKey;
    let response = await fetch('https://api.nasa.gov/EPIC/api/natural?api_key=' + APIKey);
    const EPICAPIData = await response.json();
    return EPICAPIData;
}

export default EPICAPICall;


async function GetEvents(){
  
    let url = 'https://eonet.gsfc.nasa.gov/api/v3/events';
    //API key not needed for this NASA API
    const APIKey = process.env.REACT_APP_API_KEY;
    let response = await fetch(url);
    let data = await response.json();

    console.log(data);
    
    return data;
}

export default GetEvents;
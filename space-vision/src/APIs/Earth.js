async function earthAPICall(longitude, latitude, date){
    let response;
    if (longitude === undefined || latitude === undefined)
    {
        response = await fetch('https://api.nasa.gov/planetary/earth/imagery?lon=100.75&lat=1.5&api_key=REACT_APP_API_KEY');
    }
    else if (date === undefined)
    {
        response = await fetch('https://api.nasa.gov/planetary/earth/imagery?lon=' + longitude + '&lat=' + latitude + '&api_key=REACT_APP_API_KEY');
    }
    else
    {
        response = await fetch('https://api.nasa.gov/planetary/earth/imagery?lon=' + longitude + '&lat=' + latitude + '&date=' + date + 'api_key=REACT_APP_API_KEY');
    }
    return await response.json();
}

export default earthAPICall;
async function EarthAPICall(longitude, latitude, date){
    const APIKey = process.env.REACT_APP_API_KEY;
    let response;
    if (longitude === '' || latitude === '')
    {
        response = await fetch('https://api.nasa.gov/planetary/earth/assets?lon=-95.33&lat=29.78&date=2018-01-01&&dim=0.10&api_key=' + APIKey);
    }
    else if (date === undefined)
    {
        response = await fetch('https://api.nasa.gov/planetary/earth/imagery?lon=' + longitude + '&lat=' + latitude + '&api_key=' + APIKey);
    }
    else
    {
        response = await fetch('https://api.nasa.gov/planetary/earth/imagery?lon=' + longitude + '&lat=' + latitude + '&date=' + date + 'api_key=' + APIKey);
    }
    return await response.json();
}

export default EarthAPICall;
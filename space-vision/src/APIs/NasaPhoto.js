async function fetchPhoto(date){
    const APIKey = process.env.REACT_APP_API_KEY;
    let response;
    if (date !== undefined)
    {
        response = await fetch('https://api.nasa.gov/planetary/apod&date=' + date +'?api_key='+ APIKey);
    }
    else
    {
        response = await fetch('https://api.nasa.gov/planetary/apod?api_key='+ APIKey);
    }
    let apodData = await response.json();
    return apodData;
}

export default fetchPhoto;
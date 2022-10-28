async function fireballAPICall(minDate, maxDate){
    let response;
    if (minDate === undefined)
    {
        response = await fetch('https://ssd-api.jpl.nasa.gov/fireball.api?req-loc=true&req-alt=true&req-vel=true&limit=25');
    }
    else if (maxDate === undefined)
    {
        response = await fetch('https://ssd-api.jpl.nasa.gov/fireball.api?date-min='+ minDate +'&req-loc=true&req-alt=true&req-vel=true&limit=25');
    }
    else
    {
        response = await fetch('https://ssd-api.jpl.nasa.gov/fireball.api?date-min='+ minDate +'&date-max='+ maxDate +'&req-loc=true&req-alt=true&req-vel=true&limit=25')
    }
    return await response.json();
}

export default fireballAPICall;
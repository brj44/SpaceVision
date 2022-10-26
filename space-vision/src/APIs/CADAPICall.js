async function CADAPICall(designation){
    let response;
    if (designation === undefined)
    {
        response = await fetch('https://ssd-api.jpl.nasa.gov/cad.api');
    }
    else
    {
        response = await fetch('https://ssd-api.jpl.nasa.gov/cad.api?des=' + designation)
    }
    return await response.json();
}

export default CADAPICall;
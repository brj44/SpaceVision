async function CADAPICall(designation){
    let response;
    if (designation === undefined)
    {
        response = await fetch('https://ssd-api.jpl.nasa.gov/cad.api?diameter=true');
    }
    else
    {
        response = await fetch('https://ssd-api.jpl.nasa.gov/cad.api?des=' + designation + '&diameter=true')
    }
    return await response.json();
}

export default CADAPICall;
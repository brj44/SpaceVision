async function CADAPICall(designation){
    let response;
    const corsBypass = 'https://corsbypass.fly.dev/';
    if (designation === undefined)
    {
        response = await fetch(corsBypass + 'https://ssd-api.jpl.nasa.gov/cad.api?diameter=true&limit=20');
    }
    else
    {
        response = await fetch(corsBypass + 'https://ssd-api.jpl.nasa.gov/cad.api?body=' + designation + '&diameter=true&limit=20');
    }
    return await response.json();
}

export default CADAPICall;

async function sentryAPICall(absMag, palermoScale, impactProb){
    let response;
    if (absMag === -100 && palermoScale === -100 && impactProb === -100)
    {
        response = await fetch('https://ssd-api.jpl.nasa.gov/sentry.api');
    }
    else if (absMag !== -100 && palermoScale === -100 && impactProb === -100)
    {
        response = await fetch('https://ssd-api.jpl.nasa.gov/sentry.api?h-max='+ absMag);
    }
    else if (absMag === -100 && palermoScale !== -100 && impactProb === -100)
    {
        response = await fetch('https://ssd-api.jpl.nasa.gov/sentry.api?ps-min='+ palermoScale);
    }
    else if (absMag === -100 && palermoScale === -100 && impactProb !== -100)
    {
        response = await fetch('https://ssd-api.jpl.nasa.gov/sentry.api?ip-min='+ impactProb);
    }
    else if (absMag !== -100 && palermoScale !== -100 && impactProb === -100)
    {
        response = await fetch('https://ssd-api.jpl.nasa.gov/sentry.api?h-max='+ absMag +'&ps-min='+ palermoScale);
    }
    else if (absMag !== -100 && palermoScale === -100 && impactProb !== -100)
    {
        response = await fetch('https://ssd-api.jpl.nasa.gov/sentry.api?h-max='+ absMag +'&ip-min='+ impactProb);
    }
    else if (absMag === -100 && palermoScale !== -100 && impactProb !== -100)
    {
        response = await fetch('https://ssd-api.jpl.nasa.gov/sentry.api?ps-min='+ palermoScale +'&ip-min='+ impactProb);
    }
    else
    {
        response = await fetch('https://ssd-api.jpl.nasa.gov/sentry.api?h-max='+ absMag +'&ps-min='+ palermoScale +'&ip-min='+ impactProb);
    }
    return await response.json();
}

export default sentryAPICall;
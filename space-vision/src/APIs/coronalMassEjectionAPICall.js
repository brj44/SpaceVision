/*
    This is a basic API call using the built-in fetch functionality.
    the two key parts are the fetch function and then the await response.json() function.
    the fetch function hits the url given to it and then returns the data from the url into
    the response variable. Then await waits for all the data to be transferred before inputing
    the data into the variable. response.json(); inputs the data from the url into the
    coronalMassEjectionData variable in a json format, so we can easily access the data later on.
    Some of this info might be slightly wrong and this is a super high level view of it so
    please go research javascript promises and different ways of calling APIs in javascript.
 */
require('dotenv').config();

async function coronalMassEjectionAPICall() {
    let APIKey = process.env.APIKey;
    let response = await fetch('https://api.nasa.gov/DONKI/CMEAnalysis?startDate=2016-09-01&endDate=2016-09-30&mostAccurateOnly=true&speed=500&halfAngle=30&catalog=ALL&api_key='+ APIKey);
    let coronalMassEjectionData = await response.json();
    return coronalMassEjectionData;
}

export  default  coronalMassEjectionAPICall;
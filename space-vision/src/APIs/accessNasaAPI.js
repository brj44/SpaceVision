//assessNasaAPI.js will use the API key to access NASA API. A getter class will soon be made to access specific information in the APIs.

//this function will return a json object for the chosen 'topic' from which information can be extracted
//topic choices: 'apod','asteroid neo','earth','insight','mars rover photos'
async function createJson(topic){

    start_date = 'start_date=2022-9-30&'
    last_date= 'end_date=2022-10-01&'
    today = 'date=2022-10-01&'

    var api_call; 

    //fill in variables to get more specific API results
    //variables marked with '' already have default values specified on NASA's API website

    if (topic == 'apod'){
        path = '/planetary/apod?';
        date =''              //use format: &date=[YYYY-MM-DD]
        begin_date = ''       //use format: &begin_date=[YYYY-MM-DD]
        end_date = ''         //use format: &end_date=[YYYY-MM-DD]
        count = ''            //use format: &count=[int] 
        thumbs =''            //use format: &thumbs=[True/False]
        api_call = path + date + begin_date + end_date + count + thumbs
    }

    else if (topic = 'asteroid neo'){
        path = '/neo/rest/v1/feed?';
        begin_date = ''       //use format: &begin_date=[YYYY-MM-DD]
        end_date = ''         //use format: &end_date=[YYYY-MM-DD]
        api_call = path + begin_date +end_date
    }

    else if (topic == 'earth'){
        path = '/planetary/earth/imagery?';
        lat = 'lat=0.0&'     //use format: &lat=[float]
        lon = 'lon=0.0&'     //use format: &lon=[float]
        dim = ''             //use format: &dim=[float]
        date = ''            //use format: &date=[YYYY-MM-DD]
        api_call = path + lat + dim + date
    }

    else if (topic == 'insight'){
        path = '/insight_weather/?';
        version = ''                       //use format: &version=[float]
        feedtype = 'feedtype=json&'        //use format: &feedtype=[string]
        api_call = path + version + feedtype
    }

    else if (topic == 'mars rover photos'){
        path == '/mars-photos/api/v1/rovers/curiosity/photos?';
        sol= 'sol=1000&'     //use format: &sol=[int]
        camera= ''           //use format: &camera=[string]
        page = ''            //use format: &page=[int]
        api_call=path + sol+ camera + page
    }

    else
        console.log("Invalid topic provided")

//for working version swap out stars with api key
    let APIKey = process.env.REACT_APP_API_KEY;
    let response = await fetch('https://api.nasa.gov' + api_call + 'api_key=' + APIKey );
    const APIData = await response.json();
    return APIData;
};


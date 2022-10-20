//assessNasaAPI.js will use the API key to access NASA API. A getter class will soon be made to access specific information in the APIs.

//this function will return a json object for the chosen 'topic' from which information can be extracted
//topic choices: 'apod','asteroid neo','earth','insight','mars rover photos'
async function createJson(topic){

    let start_date = 'start_date=2022-9-30&'
    let last_date= 'end_date=2022-10-01&'
    let today = 'date=2022-10-01&'

    var api_call; 

    //fill in variables to get more specific API results
    //variables marked with '' already have default values specified on NASA's API website

    if (topic == 'apod'){
        let path = '/planetary/apod?';
        let date =''              //use format: date=[YYYY-MM-DD]&
        let begin_date = ''       //use format: begin_date=[YYYY-MM-DD]&
        let end_date = ''         //use format: end_date=[YYYY-MM-DD]&
        let count = ''            //use format: count=[int]&
        let thumbs =''            //use format: thumbs=[True/False]&
        api_call = path + date + begin_date + end_date + count + thumbs
    }

    else if (topic == 'asteroid neo'){
        let path = '/neo/rest/v1/feed?';
        let begin_date = ''       //use format: begin_date=[YYYY-MM-DD]&
        let end_date = ''         //use format: end_date=[YYYY-MM-DD]&
        api_call = path + begin_date +end_date
    }

    else if (topic == 'earth'){
        let path = '/planetary/earth/imagery?';
        let lat = 'lat=0.0&'     //use format: lat=[float]&
        let lon = 'lon=0.0&'     //use format: lon=[float]&
        let dim = ''             //use format: dim=[float]&
        let date = ''            //use format: date=[YYYY-MM-DD]&
        api_call = path + lat + dim + date
    }

    else if (topic == 'insight'){
        let path = '/insight_weather/?';
        let version = ''                       //use format: version=[float]&
        let feedtype = 'feedtype=json&'        //use format: feedtype=[string]&
        api_call = path + version + feedtype
    }

    else if (topic == 'mars rover photos'){
        let path = '/mars-photos/api/v1/rovers/curiosity/photos?';
        let earth_date= 'earth_date=2022-10-17&'     //use format:'earth_date=[date]&'
        let camera= ''           //use format: camera=[string]&
        let page = ''            //use format: page=[int]&
        api_call=path + earth_date + camera + page
    }

    else
        console.log("Invalid topic provided")

//for working version swap out stars with api key
    let APIKey = process.env.REACT_APP_API_KEY;
    let response = await fetch('https://api.nasa.gov' + api_call + 'api_key=' + APIKey );
    const APIData = await response.json();
    return APIData;
};

export default createJson;
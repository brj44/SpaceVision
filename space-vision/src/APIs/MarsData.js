

async function getPhoto(){
    let path = '/mars-photos/api/v1/rovers/curiosity/photos?';
    let earth_date= 'earth_date=2022-10-17&'     //use format:'earth_date=[date]&'
    let camera= ''           //use format: camera=[string]&
    let page = ''            //use format: page=[int]&
    let api_call=path + earth_date + camera + page;

    const APIKey = process.env.REACT_APP_API_KEY;
    let response = await fetch('https://api.nasa.gov' + api_call + 'api_key=' + APIKey );
    let data = await response.json();
    return data;
}

export default getPhoto;